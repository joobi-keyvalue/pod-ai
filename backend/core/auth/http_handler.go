package auth

import (
	"github.com/gorilla/mux"
	"github.com/keycode/podai/api"
	"github.com/keycode/podai/logger"
	"net/http"
	"strconv"
)

func HandleGetUserByID(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		id := vars["id"]
		userID, err := strconv.ParseInt(id, 10, 64)
		user, err := service.GetUserByID(req.Context(), userID)
		if err != nil {
			if err == ErrUserNotFound {
				logger.Error(req.Context(), "user not found", err.Error())
				api.RespondWithError(res, http.StatusInternalServerError, api.Response{
					Error: "user not found",
				})
				return
			}
			logger.Error(req.Context(), "error getting user", err.Error())
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error: "error getting user",
			})
			return
		}

		api.RespondWithJSON(res, http.StatusOK, api.Response{
			Data: user,
		})
	})
}
