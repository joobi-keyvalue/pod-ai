package topic

type createTopicRequest struct {
	Prompt string `json:"prompt"`
	UserID string `json:"user_id"`
}

type createTopicResponse struct {
	ExistingTopics []string `json:"existing_topics"`
	InferredTopics []string `json:"inferred_topics"`
}
