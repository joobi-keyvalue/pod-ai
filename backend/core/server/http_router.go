package server

import (
	"github.com/gorilla/mux"
	"github.com/keycode/podai/auth"
	"github.com/keycode/podai/tts"
	"net/http"
)

func initRouter(dependencies Dependencies) (router *mux.Router) {
	router = mux.NewRouter()
	router.StrictSlash(true)

	router.Handle("/user/{id}", auth.HandleGetUserByID(dependencies.AuthService)).Methods(
		http.MethodGet,
	)

	router.Handle("/login", auth.HandleLogin(dependencies.AuthService)).Methods(
		http.MethodPost,
	)

	router.Handle("/create-user", auth.HandleCreateUser(dependencies.AuthService)).Methods(
		http.MethodPost,
	)

	router.Handle("/generate-tts", tts.HandleStartTTS(dependencies.TTSService)).Methods(
		http.MethodPost,
	)

	return
}
