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
		WHERE user_id = $1
		ORDER BY date DESC
		LIMIT $2 OFFSET $3
	`

	getLikedPodcastsQuery = `
		SELECT podcast_id, title, script, transcript, date, user_id, is_liked, audio_link
		FROM podcast
		WHERE is_liked = true
		AND user_id = $1
		ORDER BY date DESC
		LIMIT $2 OFFSET $3
	`

	getSourcesByPodcastIDQuery = `
		SELECT source_url
		FROM source
		WHERE summary_id = (
			SELECT summary_id
			FROM summary_podcast
			WHERE podcast_id = $1
		)
	`
)
