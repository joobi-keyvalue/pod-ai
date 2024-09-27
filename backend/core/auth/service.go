package auth

import (
	"context"
	"database/sql"
	"github.com/keycode/podai/logger"
	"github.com/keycode/podai/store"
)

type Service interface {
	GetUserByID(ctx context.Context, userID int64) (user store.User, err error)
}

type service struct {
	userStore store.UserStorer
}

func NewService(userStore store.UserStorer) Service {
	return &service{
		userStore: userStore,
	}
}

func (s *service) GetUserByID(ctx context.Context, userID int64) (user store.User, err error) {
	user, err = s.userStore.GetByID(ctx, userID)
	if err != nil {
		if err == sql.ErrNoRows {
			err = ErrUserNotFound
		}
		logger.Error(ctx, "error fetching user", err.Error())
		return
	}
	return
}
