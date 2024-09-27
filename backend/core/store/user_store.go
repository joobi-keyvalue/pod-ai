package store

import (
	"context"
)

type User struct {
	ID          int64  `db:"user_id" json:"id"`
	Name        string `db:"name" json:"name"`
	PhoneNumber string `db:"phone_number" json:"phone_number"`
}

func (s *userStore) GetByID(ctx context.Context, userID int64) (u User, err error) {

	err = s.db.GetContext(ctx, &u, getUserByIDQuery, userID)
	if err != nil {
		return
	}

	return

}
