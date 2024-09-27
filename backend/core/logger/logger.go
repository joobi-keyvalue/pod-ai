package logger

import (
	"context"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var sugaredLogger *zap.SugaredLogger

func SetupLogger() (*zap.SugaredLogger, error) {
	logger, err := getLoggerbyEnv()
	if err != nil {
		return nil, err
	}

	sugaredLogger = logger.Sugar()
	return sugaredLogger, nil
}

func getLoggerbyEnv() (logger *zap.Logger, err error) {
	option := zap.AddCallerSkip(1)

	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	return config.Build(option)
}

func Error(ctx context.Context, args ...interface{}) {
	sugaredLogger.Error(args...)
}

func Info(ctx context.Context, args ...interface{}) {
	sugaredLogger.Info(args...)
}
