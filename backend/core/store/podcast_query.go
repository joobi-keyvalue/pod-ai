package store

const (
	likePodcastByIDQuery = `
		UPDATE podcast
		SET is_liked = true
		WHERE podcast_id = $1
	`

	getPodcastByIDQuery = `
		SELECT podcast_id, title, script, transcript, date, user_id, is_liked, audio_link
		FROM podcast
		WHERE podcast_id = $1
	`

	getPodcastsQuery = `
		SELECT podcast_id, title, script, transcript, date, user_id, is_liked, audio_link
		FROM podcast
		ORDER BY date DESC
		LIMIT $1 OFFSET $2
	`

	getLikedPodcastsQuery = `
		SELECT podcast_id, title, script, transcript, date, user_id, is_liked, audio_link
		FROM podcast
		WHERE is_liked = true
		ORDER BY date DESC
		LIMIT $1 OFFSET $2
	`
)
