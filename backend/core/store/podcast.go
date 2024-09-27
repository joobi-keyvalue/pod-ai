package store

import (
	"context"

	"github.com/jmoiron/sqlx"
)

type PodcastStorer interface {
	LikePodcast(ctx context.Context, podcastID int64) (err error)
	GetPodcastByID(ctx context.Context, podcastID int64) (podcast Podcast, err error)
	GetPodcasts(ctx context.Context, limit, offset int, isLiked bool) (podcasts []Podcast, err error)
	GetSourcesByPodcastID(ctx context.Context, podcastID int64) (sources []string, err error)
}

type podcastStore struct {
	db *sqlx.DB
}

func NewPodcastStore(db *sqlx.DB) PodcastStorer {
	return &podcastStore{db: db}
}
