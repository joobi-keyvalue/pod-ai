package topic

import (
	"encoding/json"
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

func HandleCreateTopic(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		var request createTopicRequest
		err := json.NewDecoder(req.Body).Decode(&request)
		if err != nil {
			logger.Error(req.Context(), "error reading request", "error", err.Error(), "request body", req.Body)
			api.RespondWithError(res, http.StatusBadRequest, api.Response{
				Error: "error creating topic",
			})
			return
		}
		topic, err := service.CreateTopic(req.Context(), request)
		if err != nil {
			if err == ErrTopicAlreadyExists {
				logger.Error(req.Context(), "topic already exists", err.Error())
				api.RespondWithError(res, http.StatusBadRequest, api.Response{
					Error: "topic already exists",
				})
				return
			}
			logger.Error(req.Context(), "error creating topic", err.Error())
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error: "error creating topic",
			})
			return
		}

		api.RespondWithJSON(res, http.StatusCreated, api.Response{
			Data: topic,
		})
	})
}
