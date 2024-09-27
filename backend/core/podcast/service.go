package podcast

import (
	"context"

	"github.com/keycode/podai/dto"
	"github.com/keycode/podai/logger"
	"github.com/keycode/podai/store"
)

type Service interface {
	LikePodcast(ctx context.Context, podcastID int64) (err error)
	GetPodcastByID(ctx context.Context, podcastID int64) (dto.Podcast, error)
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

func (s *service) GetPodcastByID(ctx context.Context, podcastID int64) (podcast dto.Podcast, err error) {
	storePodcast, err := s.podcastStore.GetPodcastByID(ctx, podcastID)
	if err != nil {
		logger.Error(ctx, "error getting podcast by ID", err.Error())
		return
	}

	podcast = dto.Podcast{
		PodcastID:  storePodcast.PodcastID,
		Title:      storePodcast.Title,
		Script:     storePodcast.Script,
		Transcript: storePodcast.Transcript,
		Date:       storePodcast.Date,
		UserID:     storePodcast.UserID,
		IsLiked:    storePodcast.IsLiked,
		AudioLink:  storePodcast.AudioLink,
	}

	return
}
