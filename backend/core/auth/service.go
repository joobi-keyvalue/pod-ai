package auth

import (
	"context"
	"github.com/keycode/podai/logger"
	"github.com/keycode/podai/store"
)

type Service interface {
	GetUser(ctx context.Context, userID int64) (user string, err error)
}

type service struct {
	userStore store.UserStorer
}

func NewService(userStore store.UserStorer) Service {
	return &service{
		userStore: userStore,
	}
}

func (s *service) GetUser(ctx context.Context, userID int64) (user string, err error) {
	u, err := s.userStore.GetByID(ctx, userID)
	if err != nil {
		logger.Error(ctx, "error fetching user", err.Error())
		return
	}
	logger.Info(ctx, "ivde ethi", u.Name, u.ID)

	return u.Name, nil
}
