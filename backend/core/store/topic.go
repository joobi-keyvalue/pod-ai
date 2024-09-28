package store

import (
	"context"
	"github.com/jmoiron/sqlx"
)

type TopicStorer interface {
	GetAll(ctx context.Context) (topics []Topic, err error)
	GetTopicByName(ctx context.Context, name string) (topic Topic, err error)
	CreateTopic(ctx context.Context, topicName string) (topic Topic, err error)
	GetTopicIDByNames(ctx context.Context, topicNames []string) (topicIDs []string, err error)
}

type topicStore struct {
	db *sqlx.DB
}

func NewTopicStore(db *sqlx.DB) TopicStorer {
	return &topicStore{db: db}
}
