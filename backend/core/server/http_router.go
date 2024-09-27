package server

import (
	"github.com/gorilla/mux"
	"github.com/keycode/podai/auth"
	"github.com/keycode/podai/podcast"
	"net/http"
)

func initRouter(dependencies Dependencies) (router *mux.Router) {
	router = mux.NewRouter()
	router.StrictSlash(true)

	router.Handle("/user", auth.HandleGetUSer(dependencies.AuthService)).Methods(
		http.MethodGet,
	)

	router.Handle("/podcast/{id}/like", podcast.HandleLikePodcast(dependencies.PodcastService)).Methods(
		http.MethodPost,
	)
	
	return
}
