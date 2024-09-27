package topic

import (
	"github.com/keycode/podai/api"
	"github.com/keycode/podai/logger"
	"net/http"
)

func HandleGetAllTopics(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		topics, err := service.GetAllTopics(req.Context())
		if err != nil {
			logger.Error(req.Context(), "error getting topics", err.Error())
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error: "error getting topics",
			})
			return
		}

		api.RespondWithJSON(res, http.StatusOK, api.Response{
			Data: topics,
		})
	})
}
