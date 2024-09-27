package db

import (
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

const (
	defaultMaxIdleConns = 10
	defaultMaxOpenConns = 1000
)

var (
	db *sqlx.DB
)

type Config struct {
	Driver          string
	URL             string
	MaxIdleConns    int
	MaxOpenConns    int
	ConnMaxLifeTime time.Duration
	ConnMaxIdleTime time.Duration
}

func (c *Config) maxIdleConns() int {
	if c.MaxIdleConns == 0 {
		return defaultMaxIdleConns
	}

	return c.MaxIdleConns
}

func (c *Config) maxOpenConns() int {
	if c.MaxOpenConns == 0 {
		return defaultMaxOpenConns
	}

	return c.MaxOpenConns
}

func (c *Config) connMaxLifeTime() time.Duration {
	if c.ConnMaxLifeTime == 0 {
		return 0
	}

	return c.ConnMaxLifeTime
}

func (c *Config) connMaxIdleTime() time.Duration {
	if c.ConnMaxIdleTime == 0 {
		return 0
	}

	return c.ConnMaxIdleTime
}

func Init(config *Config) error {
	d, err := NewDB(config)
	if err != nil {
		return err
	}

	db = d
	return nil
}

func NewDB(config *Config) (*sqlx.DB, error) {
	d, err := sqlx.Open(config.Driver, config.URL)
	if err != nil {
		return nil, err
	}

	if err = d.Ping(); err != nil {
		return nil, err
	}

	d.SetMaxIdleConns(config.maxIdleConns())
	d.SetMaxOpenConns(config.maxOpenConns())
	d.SetConnMaxLifetime(config.connMaxLifeTime())
	d.SetConnMaxIdleTime(config.connMaxIdleTime())
	return d, err
}

func Get() *sqlx.DB {
	return db
}

func Close() error {
	return db.Close()
}
