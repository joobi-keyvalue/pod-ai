package store

import (
	"context"
)

type User struct {
	ID             int64  `db:"user_id" json:"id"`
	Name           string `db:"name" json:"name"`
	PhoneNumber    string `db:"phone_number" json:"phone_number"`
	IsExistingUser bool   `json:"is_existing_user"`
}

func (s *userStore) GetByID(ctx context.Context, userID int64) (u User, err error) {

	err = s.db.GetContext(ctx, &u, getUserByIDQuery, userID)
	if err != nil {
		return
	}

	return

}

func (s *userStore) GetByPhoneNumber(ctx context.Context, phoneNumber string) (u User, err error) {
	err = s.db.GetContext(ctx, &u, getUserByPhoneNumberQuery, phoneNumber)
	if err != nil {
		return
	}
	return
}

func (s *userStore) CreateUser(ctx context.Context, phoneNumber string, name string) (u User, err error) {

	err = s.db.GetContext(ctx, &u, insertUserQuery, phoneNumber, name)
	if err != nil {
		return
	}
	return

}
