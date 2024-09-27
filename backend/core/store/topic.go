package store

import (
	"context"
	"github.com/jmoiron/sqlx"
)

type TopicStorer interface {
	GetAll(ctx context.Context) (topics []Topic, err error)
}

type topicStore struct {
	db *sqlx.DB
}

func NewTopicStore(db *sqlx.DB) TopicStorer {
	return &topicStore{db: db}
}
