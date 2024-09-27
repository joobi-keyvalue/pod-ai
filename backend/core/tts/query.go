package tts

const (
	fetchScript = `SELECT podcast_id, title, script, transcript, "date", user_id, is_liked, audio_link
FROM podcast where audio_link = ''; `

	updateAudioLink = `UPDATE podcast SET audio_link = $1 WHERE podcast_id = $2;`
)
