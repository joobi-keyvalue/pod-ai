package server

import (
	"github.com/keycode/podai/auth"
	"github.com/keycode/podai/db"
	"github.com/keycode/podai/store"
	"github.com/keycode/podai/tts"
)

type Dependencies struct {
	UserStore   store.UserStorer
	AuthService auth.Service
	TTSService  tts.Service
}

func NewDependencies() (dependencies Dependencies, err error) {
	appDB := db.Get()
	userStore := store.NewUserStore(appDB)
	authService := auth.NewService(userStore)

	ttsService := tts.NewService(appDB)

	dependencies = Dependencies{
		UserStore:   userStore,
		AuthService: authService,
		TTSService:  ttsService,
	}

	return
}
