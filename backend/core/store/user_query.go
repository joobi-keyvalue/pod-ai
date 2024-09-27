package store

const (
	getUserByIDQuery = `SELECT name
						FROM "user" 
						WHERE id = $1`
)
