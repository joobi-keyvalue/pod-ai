package store

import (
	"context"
	"database/sql"
	"time"

	"github.com/keycode/podai/constants"
)

type Podcast struct {
	PodcastID  int64     `db:"podcast_id"`
	Title      string    `db:"title"`
	Script     *string   `db:"script"`
	Transcript *string   `db:"transcript"`
	Date       time.Time `db:"date"`
	UserID     *int32    `db:"user_id"`
	IsLiked    *bool     `db:"is_liked"`
	AudioLink  *string   `db:"audio_link"`
}

func (s *podcastStore) LikePodcast(ctx context.Context, podcastID int64) (err error) {
	_, err = s.db.ExecContext(ctx, likePodcastByIDQuery, podcastID)
	if err != nil {
		return
	}

	return
}

func (s *podcastStore) GetPodcastByID(ctx context.Context, podcastID int64) (podcast Podcast, err error) {
	err = s.db.GetContext(ctx, &podcast, getPodcastByIDQuery, podcastID)
	if err != nil {
		if err == sql.ErrNoRows {
			return Podcast{}, constants.ErrPodcastNotFound
		}
		return
	}

	return
}
