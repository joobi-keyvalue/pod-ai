package store

const (
	getUserByIDQuery = `SELECT user_id, name, phone_number
						FROM "user" 
						WHERE user_id = $1`

	getUserByPhoneNumberQuery = `SELECT user_id, name, phone_number
						FROM "user" 
						WHERE phone_number = $1`

	insertUserQuery = `INSERT INTO "user" (phone_number, name) VALUES ($1, $2)`
)
