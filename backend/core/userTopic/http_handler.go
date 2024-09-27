package userTopic

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/keycode/podai/api"
	"github.com/keycode/podai/logger"
	"net/http"
)

func HandleAddUserTopic(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		var request addUserTopicRequest
		err := json.NewDecoder(req.Body).Decode(&request)
		if err != nil {
			logger.Error(req.Context(), "error reading request", "error", err.Error(), "request body", req.Body)
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error: "error adding user topics",
			})
			return
		}
		vars := mux.Vars(req)
		id := vars["user_id"]
		request.UserID = id
		errors := request.Validate()
		if len(errors) > 0 {
			logger.Error(req.Context(), "error validating request", "request", request, "errors", errors)
			api.RespondWithError(res, http.StatusBadRequest, api.Response{
				Error:  "error validating request",
				Errors: errors,
			})
			return
		}
		userTopics, err := service.AddUserTopic(req.Context(), request)
		if err != nil {
			logger.Error(req.Context(), "error adding user topics", err.Error())
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error: "error adding user topics",
			})
			return
		}

		api.RespondWithJSON(res, http.StatusOK, api.Response{
			Data: userTopics,
		})
	})
}

func HandleGetUserTopics(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		userID := vars["user_id"]
		userTopics, err := service.GetTopicByUserID(req.Context(), userID)
		if err != nil {
			logger.Error(req.Context(), "error getting user topics", err.Error())
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error: "error getting user topics",
			})
			return
		}

		api.RespondWithJSON(res, http.StatusOK, api.Response{
			Data: userTopics,
		})
	})
}

func (r addUserTopicRequest) Validate() (errors []api.ErrorInfo) {
	if len(r.TopicIDs) == 0 {
		errors = append(errors, api.ErrorInfo{
			Field:   "topic_ids",
			Message: "can't be empty",
		})
	}
	if len(r.UserID) == 0 {
		errors = append(errors, api.ErrorInfo{
			Field:   "user_id",
			Message: "can't be empty",
		})
	}
	return
}
