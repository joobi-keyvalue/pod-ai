package auth

import (
	"github.com/keycode/podai/api"
	"github.com/keycode/podai/logger"
	"net/http"
	"strconv"
)

func HandleGetUSer(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		userID := req.URL.Query().Get("id")
		user, err := strconv.ParseInt(userID, 10, 64)
		disbursements, err := service.GetUser(req.Context(), user)
		if err != nil {
			logger.Error(req.Context(), "error getting user", err.Error())
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error: "error getting user",
			})
			return
		}

		api.RespondWithJSON(res, http.StatusOK, api.Response{
			Data: disbursements,
		})
	})
}
