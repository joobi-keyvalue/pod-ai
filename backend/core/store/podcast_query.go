package store

const (
	likePodcastByIDQuery = `UPDATE podcast
						SET is_liked = true
						WHERE podcast_id = $1`
)
