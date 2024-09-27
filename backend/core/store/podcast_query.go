package store

const (
	likePodcastByIDQuery = `UPDATE podcast
						SET is_liked = true
						WHERE podcast_id = $1`
	getPodcastByIDQuery = `
						SELECT podcast_id, title, script, transcript, date, user_id, is_liked, audio_link
						FROM podcast
						WHERE podcast_id = $1`
)
