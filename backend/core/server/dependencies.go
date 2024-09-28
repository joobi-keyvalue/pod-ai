package server

import (
	"github.com/keycode/podai/auth"
	"github.com/keycode/podai/db"
	"github.com/keycode/podai/podcast"
	"github.com/keycode/podai/store"
	"github.com/keycode/podai/topic"
	"github.com/keycode/podai/tts"
	"github.com/keycode/podai/userTopic"
)

type Dependencies struct {
	UserStore        store.UserStorer
	AuthService      auth.Service
	PodcastService   podcast.Service
	TTSService       tts.Service
	TopicStore       store.TopicStorer
	TopicService     topic.Service
	UserTopicStore   store.UserTopicStorer
	UserTopicService userTopic.Service
}

func NewDependencies() (dependencies Dependencies, err error) {
	appDB := db.Get()
	userStore := store.NewUserStore(appDB)
	podcastStore := store.NewPodcastStore(appDB)

	topicStore := store.NewTopicStore(appDB)
	userTopicStore := store.NewUserTopicStore(appDB)
	userTopicService := userTopic.NewService(userTopicStore)
	authService := auth.NewService(userStore)
	podcastService := podcast.NewService(podcastStore)
	ttsService := tts.NewService(appDB)
	topicService := topic.NewService(topicStore, userTopicService)

	dependencies = Dependencies{
		UserStore:        userStore,
		AuthService:      authService,
		TTSService:       ttsService,
		PodcastService:   podcastService,
		TopicStore:       topicStore,
		TopicService:     topicService,
		UserTopicStore:   userTopicStore,
		UserTopicService: userTopicService,
	}

	return
}
