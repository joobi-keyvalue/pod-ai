package store

import "context"

type Topic struct {
	ID   int64  `db:"id" json:"id"`
	Name string `db:"name" json:"name"`
}

func (s *topicStore) GetAll(ctx context.Context) (topics []Topic, err error) {

	err = s.db.SelectContext(ctx, &topics, getAllTopic)
	if err != nil {
		return
	}

	return

}
