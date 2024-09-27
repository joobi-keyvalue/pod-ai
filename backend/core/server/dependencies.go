package server

import (
	"github.com/keycode/podai/auth"
	"github.com/keycode/podai/db"
	"github.com/keycode/podai/podcast"
	"github.com/keycode/podai/store"
)

type Dependencies struct {
	UserStore      store.UserStorer
	AuthService    auth.Service
	PodcastService podcast.Service
}

func NewDependencies() (dependencies Dependencies, err error) {
	appDB := db.Get()
	userStore := store.NewUserStore(appDB)
	podcastStore := store.NewPodcastStore(appDB)

	authService := auth.NewService(userStore)
	podcastService := podcast.NewService(podcastStore)
	dependencies = Dependencies{
		UserStore:      userStore,
		AuthService:    authService,
		PodcastService: podcastService,
	}

	return
}
