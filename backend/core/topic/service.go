package topic

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/keycode/podai/config"
	"github.com/keycode/podai/logger"
	"github.com/keycode/podai/store"
	"github.com/keycode/podai/userTopic"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
)

type Service interface {
	GetAllTopics(ctx context.Context) (topics []store.Topic, err error)
	CreateTopic(ctx context.Context, request createTopicRequest) (topic store.Topic, err error)
}

type service struct {
	topicStore       store.TopicStorer
	userTopicService userTopic.Service
}

func NewService(topicStore store.TopicStorer, userTopicService userTopic.Service) Service {
	return &service{
		topicStore:       topicStore,
		userTopicService: userTopicService,
	}
}

func (s *service) GetAllTopics(ctx context.Context) (topics []store.Topic, err error) {
	topics, err = s.topicStore.GetAll(ctx)
	if err != nil {
		logger.Error(ctx, "error getting topics", err.Error())
		return
	}
	return
}

func (s *service) CreateTopic(ctx context.Context, request createTopicRequest) (topic store.Topic, err error) {
	var responseBody createTopicResponse

	triggerPodcastCreationBaseURL := config.ReadEnvString("TRIGGER_PODCAST_BASE_URL")
	url := fmt.Sprintf("%sprocess-prompt", triggerPodcastCreationBaseURL)
	jsonData, err := json.Marshal(request)
	if err != nil {
		log.Fatalf("Error marshaling request data: %v", err)
	}
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		logger.Error(ctx, "Error creating request: ", err.Error())
		return
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}

	logger.Info(ctx, "triggering topic generation")
	resp, err := client.Do(req)
	if err != nil {
		logger.Error(ctx, "Error sending request: ", err.Error())
		return
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		logger.Error(ctx, "Error reading response body: ", err.Error())
		return
	}
	defer resp.Body.Close()

	// Check the status code of the response
	if resp.StatusCode == http.StatusOK {
		fmt.Println("Body is: ", string(body))
		cleaned := strings.ReplaceAll(string(body), "\\", "")
		if strings.HasPrefix(cleaned, `"`) {
			cleaned = strings.TrimPrefix(cleaned, `"`)
		}
		if strings.HasPrefix(cleaned, `'`) {
			cleaned = strings.TrimPrefix(cleaned, `'`)
		}

		// Check if the string ends with a quote
		if strings.HasSuffix(cleaned, `"`) {
			cleaned = strings.TrimSuffix(cleaned, `"`)
		}
		if strings.HasSuffix(cleaned, `'`) {
			cleaned = strings.TrimSuffix(cleaned, `'`)
		}
		logger.Info(ctx, "POST request successful: ", string(cleaned))
		err = json.Unmarshal([]byte(cleaned), &responseBody)
		if err != nil {
			logger.Error(ctx, "Error reading response body: ", err.Error())
			return
		}
	} else {
		err = errors.New("non 200 response")
		logger.Error(ctx, "non 200 response: ", err.Error(), "response: ", resp)
		return
	}
	logger.Info(ctx, "topic generation finished")

	existingTopicsMap := make(map[string]bool)
	for _, topics := range responseBody.ExistingTopics {
		existingTopicsMap[strings.ToLower(topics)] = true
	}

	// Find inferred topics that are not present in existing topics
	var missingTopics []string
	for _, topics := range responseBody.InferredTopics {
		lowercaseTopic := strings.ToLower(topics)
		if !existingTopicsMap[lowercaseTopic] {
			missingTopics = append(missingTopics, topics)
		}
	}
	var topicIDs []string
	if len(missingTopics) > 0 {
		for _, missingTopic := range missingTopics {
			t, createErr := s.topicStore.CreateTopic(ctx, missingTopic)
			if createErr != nil {
				err = createErr
				logger.Error(ctx, "Error creating topic: ", err.Error())
				return
			}
			topicIDs = append(topicIDs, strconv.FormatInt(t.ID, 10))
		}
	}

	ids, err := s.topicStore.GetTopicIDByNames(ctx, append(responseBody.ExistingTopics, responseBody.InferredTopics...))
	if err != nil {
		logger.Error(ctx, "Error getting topics: ", err.Error())
		return
	}

	_, err = s.userTopicService.AddUserTopic(ctx, userTopic.AddUserTopicRequest{UserID: request.UserID, TopicIDs: ids})
	if err != nil {
		logger.Error(ctx, "Error adding user topic: ", err.Error())
		return
	}

	return
}
