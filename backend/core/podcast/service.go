package podcast

import (
	"context"
	"github.com/keycode/podai/logger"
	"github.com/keycode/podai/store"
)

type Service interface {
	LikePodcast(ctx context.Context, podcastID int64) (err error)
}

type service struct {
	podcastStore store.PodcastStorer
}

func NewService(podcastStore store.PodcastStorer) Service {
	return &service{
		podcastStore: podcastStore,
	}
}

func (s *service) LikePodcast(ctx context.Context, podcastID int64) (err error) {
	err = s.podcastStore.LikePodcast(ctx, podcastID)
	if err != nil {
		logger.Error(ctx, "error liking podcast", err.Error())
		return
	}

	return
}
