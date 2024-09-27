package store

import (
	"context"

	"github.com/jmoiron/sqlx"
)

type UserStorer interface {
	GetByID(ctx context.Context, userID int64) (u User, err error)
	GetByPhoneNumber(ctx context.Context, phoneNumber string) (u User, err error)
	CreateUser(ctx context.Context, phoneNumber string, name string) (u User, err error)
}

type userStore struct {
	db *sqlx.DB
}

func NewUserStore(db *sqlx.DB) UserStorer {
	return &userStore{db: db}
}
