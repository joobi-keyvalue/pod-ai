package app

import (
	ctx "context"
	"github.com/keycode/podai/config"
	"github.com/keycode/podai/db"
	"github.com/keycode/podai/logger"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

var context *appContext

type appContext struct {
	zapLogger *zap.SugaredLogger
}

func Init() (err error) {
	context = &appContext{}
	err = initConfig()
	if err != nil {
		return
	}

	zapLogger, err := logger.SetupLogger()
	if err != nil {
		return
	}
	context.zapLogger = zapLogger

	err = initDB()
	if err != nil {
		logger.Error(ctx.TODO(), "error initializing database", "error", err.Error())
		return
	}

	return
}

func initConfig() (err error) {
	viper.SetDefault("ENV", "development")
	viper.SetConfigName("application")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./")
	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if _, ok := err.(viper.ConfigFileNotFoundError); err != nil && !ok {
		return
	}
	return
}

func Close() (err error) {

	// flushes log buffer, if any
	if context.zapLogger != nil {
		context.zapLogger.Sync()
	}

	return
}

func initDB() (err error) {
	dbConfig := config.NewDatabaseConfig()
	err = db.Init(&db.Config{
		Driver:          "postgres",
		URL:             dbConfig.ConnectionURL(),
		MaxIdleConns:    dbConfig.MaxIdleConns(),
		MaxOpenConns:    dbConfig.MaxPoolSize(),
		ConnMaxLifeTime: dbConfig.ConnMaxLifeTime(),
		ConnMaxIdleTime: dbConfig.ConnMaxIdleTime(),
	})
	if err != nil {
		return
	}

	return
}
