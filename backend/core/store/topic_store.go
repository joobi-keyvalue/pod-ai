package store

import (
	"context"
	"fmt"
	"github.com/lib/pq"
)

type Topic struct {
	ID   int64  `db:"id" json:"id"`
	Name string `db:"name" json:"name"`
}

func (s *topicStore) GetAll(ctx context.Context) (topics []Topic, err error) {

	err = s.db.SelectContext(ctx, &topics, getAllTopic)
	if err != nil {
		return
	}

	return
}

func (s *topicStore) GetTopicByName(ctx context.Context, name string) (topic Topic, err error) {
	err = s.db.GetContext(ctx, &topic, getTopicByName, name)
	if err != nil {
		return
	}

	return
}

func (s *topicStore) CreateTopic(ctx context.Context, topicName string) (topic Topic, err error) {
	err = s.db.GetContext(ctx, &topic, createTopic, topicName)
	if err != nil {
		return
	}

	return
}

func (s *topicStore) GetTopicIDByNames(ctx context.Context, topicNames []string) (topics []string, err error) {
	fmt.Println("Query: ", getTopicsByIDs)
	fmt.Println("Values: ", pq.Array(topicNames))
	err = s.db.SelectContext(ctx, &topics, getTopicsByIDs, pq.Array(topicNames))
	if err != nil {
	}
	return
}
