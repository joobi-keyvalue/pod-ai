package userTopic

type addUserTopicRequest struct {
	UserID   string   `json:"user_id"`
	TopicIDs []string `json:"topic_ids"`
}