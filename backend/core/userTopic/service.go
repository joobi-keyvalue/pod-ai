package userTopic

import (
	"context"
	"fmt"
	"github.com/keycode/podai/config"
	"github.com/keycode/podai/logger"
	"github.com/keycode/podai/store"
	"net/http"
)

type Service interface {
	AddUserTopic(ctx context.Context, request addUserTopicRequest) (user []store.UserTopic, err error)
	GetTopicByUserID(ctx context.Context, userID string) (topic []store.Topic, err error)
}

type service struct {
	userTopicStore store.UserTopicStorer
}

func NewService(userTopicStore store.UserTopicStorer) Service {
	return &service{
		userTopicStore: userTopicStore,
	}
}

func (s *service) AddUserTopic(ctx context.Context, request addUserTopicRequest) (userTopics []store.UserTopic, err error) {
	userTopics, err = s.userTopicStore.AddUserTopic(ctx, request.UserID, request.TopicIDs)
	if err != nil {
		logger.Error(ctx, "error adding user topics: ", err.Error())
		return
	}
	go triggerPodcastCreation(context.Background(), request.UserID)
	return
}

func (s *service) GetTopicByUserID(ctx context.Context, userID string) (topic []store.Topic, err error) {
	topic, err = s.userTopicStore.GetTopicsByUserID(ctx, userID)
	if err != nil {
		logger.Error(ctx, "error getting topics: ", err.Error())
		return nil, err
	}
	return
}

func triggerPodcastCreation(ctx context.Context, userID string) {
	logger.Info(ctx, "triggering podcast creation")
	triggerPodcastCreationBaseURL := config.ReadEnvString("TRIGGER_PODCAST_BASE_URL")
	url := fmt.Sprintf("%screate-podcast/%s", triggerPodcastCreationBaseURL, userID)
	fmt.Println("URL: ", url)
	req, err := http.NewRequest("POST", url, nil)
	if err != nil {
		logger.Error(ctx, "Error creating request: ", err.Error())
		return
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		logger.Error(ctx, "Error sending request: ", err.Error())
		return
	}
	defer resp.Body.Close()

	// Check the status code of the response
	if resp.StatusCode == http.StatusOK {
		logger.Info(ctx, "POST request successful")
	} else {
		logger.Info(ctx, "POST request failed with status code: ", resp.StatusCode)
	}
	logger.Info(ctx, "podcast creation finished")
}
