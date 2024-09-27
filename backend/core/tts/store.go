package tts

import (
    "context"
    "fmt"
)

func (s service) GetScript() (podcasts []PodcastDTO, err error) {
	err = s.db.SelectContext(context.Background(), &podcasts, fetchScript)
	return
}

func (s service) UpdateAudioLink(ctx context.Context, podcastID int, audioLink string) error {
	_, err := s.db.ExecContext(ctx, updateAudioLink, audioLink, podcastID)
	if err != nil {
		return fmt.Errorf("failed to update audio link: %w", err)
	}
	return nil
}
