package store

import "context"

func (s *userStore) LikePodcast(ctx context.Context, podcastID int64) (err error) {

	_, err = s.db.ExecContext(ctx, likePodcastByIDQuery, podcastID)
	if err != nil {
		return
	}

	return

}
