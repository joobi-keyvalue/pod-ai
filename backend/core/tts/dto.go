package tts

import (
	"mime/multipart"
	"time"
)

type PodcastDTO struct {
	PodcastID  int       `db:"podcast_id"` // SERIAL PRIMARY KEY
	Title      string    `db:"title"`      // varchar(255) NOT NULL
	Script     string    `db:"script"`     // TEXT
	Transcript string    `db:"transcript"` // TEXT
	Date       time.Time `db:"date"`       // DATE NOT NULL
	UserID     int       `db:"user_id"`    // FOREIGN KEY to "user" table
	IsLiked    bool      `db:"is_liked"`   // BOOLEAN DEFAULT FALSE
	AudioLink  string    `db:"audio_link"`
}

// Define the struct
type Dialogues struct {
	VoiceID string
	Text    string
}

var voiceIDMap = map[string]string{
	"Host1":  "yl2ZDV1MzN4HbQJbMihG",
	"Host2":  "amiAXapsDOAiHJqbsAZj",
	"host1":  "yl2ZDV1MzN4HbQJbMihG",
	"host2":  "amiAXapsDOAiHJqbsAZj",
	"Host 1": "yl2ZDV1MzN4HbQJbMihG",
	"Host 2": "amiAXapsDOAiHJqbsAZj",
	"Alex":   "yl2ZDV1MzN4HbQJbMihG",
	"Sam":    "amiAXapsDOAiHJqbsAZj",
	"alex":   "yl2ZDV1MzN4HbQJbMihG",
	"sam":    "amiAXapsDOAiHJqbsAZj",
}

const apiKey = "sk_311f0e463b6ddff18d81584ff9b8fa62b11cafa84df0b359"
const apiURL = "https://api.elevenlabs.io/v1/text-to-speech/"

type SpeechRequest struct {
	Text          string        `json:"text"`
	VoiceSettings VoiceSettings `json:"voice_settings"`
}

type VoiceSettings struct {
	Stability       float64 `json:"stability"`
	SimilarityBoost float64 `json:"similarity_boost"`
}

type S3UploadRequest struct {
	File      multipart.File
	FileType  string
	FileBytes []byte
	S3Path    string
	Bucket    string
}
