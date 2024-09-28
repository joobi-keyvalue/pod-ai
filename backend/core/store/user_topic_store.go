package store

import (
	"context"
	"fmt"
	"strings"
)

type UserTopic struct {
	UserID  string `db:"user_id" json:"user_id"`
	TopicID string `db:"topic_id" json:"topic_id"`
}

func (u *userTopicStore) AddUserTopic(ctx context.Context, userID string, topicIDs []string) (userTopic []UserTopic, err error) {
	var valuesPlaceholders []string
	var queryValues []interface{}

	for _, topicID := range topicIDs {
		valuesPlaceholders = append(
			valuesPlaceholders, "(?, ?)")
		queryValues = append(queryValues, userID)
		queryValues = append(queryValues, topicID)
	}
	query := fmt.Sprintf("%s %s", addUserTopicInsertClause, strings.Join(
		valuesPlaceholders, ", ",
	))
	query = fmt.Sprintf("%s %s", query, returningClause)
	query = u.db.Rebind(query)
	fmt.Println("Query: ", query)
	fmt.Println("Query values: ", queryValues)
	err = u.db.SelectContext(ctx, &userTopic, query, queryValues...)
	if err != nil {
		return
	}

	return
}

func (u *userTopicStore) GetTopicsByUserID(ctx context.Context, userID string) (topics []Topic, err error) {
	err = u.db.SelectContext(ctx, &topics, getTopicByUserID, userID)
	if err != nil {
		return
	}
	return
}
