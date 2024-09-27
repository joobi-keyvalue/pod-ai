package constants

import "errors"

var (
	ErrPodcastNotFound = errors.New("podcast not found")
	ErrSourcesNotFound = errors.New("sources not found")
)