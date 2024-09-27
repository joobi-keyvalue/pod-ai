package store

import (
	"context"
	"github.com/jmoiron/sqlx"
)

type UserTopicStorer interface {
	AddUserTopic(ctx context.Context, userID string, topicIDs []string) (userTopic []UserTopic, err error)
	GetTopicsByUserID(ctx context.Context, userID string) (topics []Topic, err error)
}

type userTopicStore struct {
	db *sqlx.DB
}

func NewUserTopicStore(db *sqlx.DB) UserTopicStorer {
	return &userTopicStore{db: db}
}
