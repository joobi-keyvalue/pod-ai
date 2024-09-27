package server

import (
	"github.com/keycode/podai/auth"
	"github.com/keycode/podai/db"
	"github.com/keycode/podai/store"
)

type Dependencies struct {
	UserStore   store.UserStorer
	AuthService auth.Service
}

func NewDependencies() (dependencies Dependencies, err error) {
	appDB := db.Get()
	userStore := store.NewUserStore(appDB)
	authService := auth.NewService(userStore)

	dependencies = Dependencies{
		UserStore:   userStore,
		AuthService: authService,
	}

	return
}
