package store

import (
	"context"

	"github.com/jmoiron/sqlx"
)

type UserStorer interface {
	GetByID(ctx context.Context, userID int64) (u User, err error)
}

type userStore struct {
	db *sqlx.DB
}

func NewUserStore(db *sqlx.DB) UserStorer {
	return &userStore{db: db}
}
