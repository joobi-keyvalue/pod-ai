package dto

import "time"

type Podcast struct {
	PodcastID  int64       `json:"id"`
	Title      string    `json:"title"`
	Script     *string   `json:"script,omitempty"`
	Transcript *string   `json:"transcript,omitempty"`
	Date       time.Time `json:"date"`
	UserID     *int32      `json:"user_id,omitempty"`
	IsLiked    *bool     `json:"is_liked,omitempty"`
	AudioLink  *string   `json:"audio_link,omitempty"`
}