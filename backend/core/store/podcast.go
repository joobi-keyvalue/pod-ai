package store

import (
	"context"

	"github.com/jmoiron/sqlx"
)

type PodcastStorer interface {
	LikePodcast(ctx context.Context, podcastID int64) (err error)
}

type podcastStore struct {
	db *sqlx.DB
}

func NewPodcastStore(db *sqlx.DB) PodcastStorer {
	return &podcastStore{db: db}
}
