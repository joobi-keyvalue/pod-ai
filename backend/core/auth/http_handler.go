package auth

import (
	"database/sql"
	"encoding/json"
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

func HandleLogin(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		var user UserInfo

		err := json.NewDecoder(req.Body).Decode(&user)
		if err != nil {
			logger.Error(req.Context(), "error reading request body", "error", err.Error())
			api.RespondWithError(res, http.StatusBadRequest, api.Response{
				Error: "error reading request body",
			})
			return
		}

		u, err := service.Login(req.Context(), user.PhoneNumber)
		if err != nil {
			if err == sql.ErrNoRows {
				u.IsExistingUser = false
				api.RespondWithJSON(res, http.StatusOK, api.Response{
					Data: u,
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
			Data: u,
		})
	})
}

func HandleCreateUser(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		var user UserInfo

		err := json.NewDecoder(req.Body).Decode(&user)
		if err != nil {
			logger.Error(req.Context(), "error reading request body", "error", err.Error())
			api.RespondWithError(res, http.StatusBadRequest, api.Response{
				Error: "error reading request body",
			})
			return
		}

		_, err = service.CreateUser(req.Context(), user.PhoneNumber, user.Name)
		if err != nil {
			logger.Error(req.Context(), "error creating user", err.Error())
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error: "error creating user",
			})
			return
		}

		api.RespondWithJSON(res, http.StatusOK, api.Response{
			Data: "success",
		})
	})
}

func HandleVerifyOTP(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		var otp struct {
			OTP string `json:"otp"`
		}

		err := json.NewDecoder(req.Body).Decode(&otp)
		if err != nil {
			logger.Error(req.Context(), "error reading request body", "error", err.Error())
			api.RespondWithError(res, http.StatusBadRequest, api.Response{
				Error: "error reading request body",
			})
			return
		}

		if otp.OTP != "1234" {
			logger.Error(req.Context(), "invalid otp", "otp", otp.OTP)
			api.RespondWithError(res, http.StatusBadRequest, api.Response{
				Error: "invalid otp",
			})
			return
		}

		api.RespondWithJSON(res, http.StatusOK, api.Response{
			Data: "otp verified",
		})
	})
}
