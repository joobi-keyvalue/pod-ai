package userTopic

import (
	"context"
	"github.com/keycode/podai/logger"
	"github.com/keycode/podai/store"
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
