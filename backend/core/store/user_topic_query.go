package store

const (
	addUserTopicInsertClause = `INSERT INTO user_topic
	(user_id, topic_id) VALUES`

	returningClause = `ON CONFLICT (user_id, topic_id) DO NOTHING RETURNING user_id, topic_id;`

	getTopicByUserID = `SELECT t.id, t.name FROM 
             topic t INNER JOIN user_topic ut
             ON t.id = ut.topic_id
             WHERE
             ut.user_id = $1;`
)
