package store

const (
	getAllTopic = `SELECT id, name FROM topic;`

	getTopicByName = `SELECT id, name FROM topic WHERE name=$1;`

	createTopic = `INSERT INTO topic (name) VALUES ($1) RETURNING id, "name";`

	getTopicsByIDs = `SELECT id FROM topic WHERE name = ANY($1);`
)
