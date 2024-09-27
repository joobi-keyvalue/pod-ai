package tts

import (
	"context"
	"github.com/keycode/podai/api"
	"github.com/keycode/podai/logger"
	"net/http"
)

func HandleStartTTS(s Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		api.RespondWithJSON(res, http.StatusOK, api.Response{})
		logger.Info(context.Background(), "api hit")
		go s.GenerateAndStore()
	})
}
