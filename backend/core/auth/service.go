package auth

import (
	"context"
	"database/sql"
	"github.com/keycode/podai/logger"
	"github.com/keycode/podai/store"
)

type Service interface {
	GetUserByID(ctx context.Context, userID int64) (user store.User, err error)
	Login(ctx context.Context, phoneNumber string) (user store.User, err error)
	CreateUser(ctx context.Context, phoneNumber string, name string) (user store.User, err error)
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

func (s *service) Login(ctx context.Context, phoneNumber string) (user store.User, err error) {
	user, err = s.userStore.GetByPhoneNumber(ctx, phoneNumber)
	if err != nil {
		logger.Error(ctx, "error fetching user", err.Error())
		return
	}
	user.IsExistingUser = true
	return
}

func (s *service) CreateUser(ctx context.Context, phoneNumber string, name string) (user store.User, err error) {
	user, err = s.userStore.CreateUser(ctx, phoneNumber, name)
	if err != nil {
		logger.Error(ctx, "error creating user", err.Error())
		return
	}
	return
}
