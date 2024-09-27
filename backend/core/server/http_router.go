package server

import (
	"github.com/gorilla/mux"
	"github.com/keycode/podai/auth"
	"net/http"
)

func initRouter(dependencies Dependencies) (router *mux.Router) {
	router = mux.NewRouter()
	router.StrictSlash(true)

	router.Handle("/user", auth.HandleGetUSer(dependencies.AuthService)).Methods(
		http.MethodGet,
	)
	return
}
