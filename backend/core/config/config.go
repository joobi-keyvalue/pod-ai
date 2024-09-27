package config

import (
	"fmt"
	"github.com/spf13/viper"
	"strconv"
	"time"
)

type databaseConfig struct {
	host            string
	dbName          string
	port            int
	user            string
	password        string
	maxPoolSize     int
	maxIdleConns    int
	connMaxLifeTime int
	connMaxIdleTime int
}

func NewDatabaseConfig() databaseConfig {
	return databaseConfig{
		host:            ReadEnvString("DB_HOST"),
		dbName:          ReadEnvString("DB_NAME"),
		port:            ReadEnvInt("DB_PORT"),
		user:            ReadEnvString("DB_USER"),
		password:        ReadEnvString("DB_PASSWORD"),
		maxPoolSize:     ReadEnvInt("DB_MAX_POOL_SIZE"),
		maxIdleConns:    ReadEnvInt("DB_MAX_IDLE_CONNECTIONS"),
		connMaxLifeTime: ReadEnvInt("DB_CONN_MAX_LIFE_TIME"),
		connMaxIdleTime: ReadEnvInt("DB_CONN_MAX_IDLE_TIME"),
	}
}

// ReadEnvIntWithDefault is function to get environment variable with type integer
func ReadEnvInt(key string) int {
	CheckIfSet(key)
	v, err := strconv.Atoi(viper.GetString(key))
	if err != nil {
		panic(fmt.Sprintf("key %s is not a valid integer", key))
	}

	return v
}

// ReadEnvString is function to get environment variable with type string
func ReadEnvString(key string) string {
	CheckIfSet(key)
	return viper.GetString(key)
}

// ReadEnvBoolWithDefault is function to get environment variable with type boolean and default value
func ReadEnvBoolWithDefault(key string, defaultVal bool) bool {
	value := viper.GetString(key)
	if value == "" {
		return defaultVal
	}

	boolVal, err := strconv.ParseBool(value)
	if err != nil {
		return defaultVal
	}

	return boolVal
}

func MustGetStringSlice(key string) []string {
	CheckIfSet(key)
	s := viper.GetStringSlice(key)

	if len(s) == 0 {
		panic(fmt.Sprintf("key %s have zero lenght expected a string slice", key))
	}

	return s
}

func CheckIfSet(key string) {
	if !viper.IsSet(key) {
		err := fmt.Errorf("key %s is not set", key)
		panic(err)
	}
}

func (dc databaseConfig) ConnectionURL() string {
	return fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=verify-full", dc.user, dc.password, dc.host, dc.port, dc.dbName)
}

func (dc databaseConfig) MaxPoolSize() int {
	return dc.maxPoolSize
}

func (dc databaseConfig) DBName() string {
	return dc.dbName
}

func (dc databaseConfig) Host() string {
	return dc.host
}

func (dc databaseConfig) Port() string {
	return fmt.Sprint(dc.port)
}

func (dc databaseConfig) MaxIdleConns() int {
	return dc.maxIdleConns
}

func (dc databaseConfig) ConnMaxLifeTime() time.Duration {
	return time.Duration(dc.connMaxLifeTime) * time.Second
}

func (dc databaseConfig) ConnMaxIdleTime() time.Duration {
	return time.Duration(dc.connMaxIdleTime) * time.Second
}
