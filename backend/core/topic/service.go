package topic

import (
	"context"
	"github.com/keycode/podai/logger"
	"github.com/keycode/podai/store"
)

type Service interface {
	GetAllTopics(ctx context.Context) (user []store.Topic, err error)
}

type service struct {
	topicStore store.TopicStorer
}

func NewService(topicStore store.TopicStorer) Service {
	return &service{
		topicStore: topicStore,
	}
}

func (s *service) GetAllTopics(ctx context.Context) (user []store.Topic, err error) {
	user, err = s.topicStore.GetAll(ctx)
	if err != nil {
		logger.Error(ctx, "error getting topics", err.Error())
		return
	}
	return
}
