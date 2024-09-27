package topic

import (
	"context"
	"database/sql"
	"github.com/keycode/podai/logger"
	"github.com/keycode/podai/store"
	"strings"
)

type Service interface {
	GetAllTopics(ctx context.Context) (topics []store.Topic, err error)
	CreateTopic(ctx context.Context, request createTopicRequest) (topic store.Topic, err error)
}

type service struct {
	topicStore store.TopicStorer
}

func NewService(topicStore store.TopicStorer) Service {
	return &service{
		topicStore: topicStore,
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
	topic, err = s.topicStore.GetTopicByName(ctx, request.Name)
	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
			topic, err = s.topicStore.CreateTopic(ctx, strings.ToLower(request.Name))
			if err != nil {
				logger.Error(ctx, "error creating topic", err.Error())
				return
			}
			return
		}
		logger.Error(ctx, "error creating topics", err.Error())
		return
	}
	err = ErrTopicAlreadyExists
	logger.Error(ctx, "topic already exists", request.Name)
	return
}
