package store

const (
	getUserByIDQuery = `SELECT user_id, name, phone_number
						FROM "user" 
						WHERE user_id = $1`
)
