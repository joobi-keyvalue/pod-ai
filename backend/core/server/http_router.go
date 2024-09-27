package server

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/keycode/podai/auth"
	"github.com/keycode/podai/podcast"
)

func initRouter(dependencies Dependencies) (router *mux.Router) {
	router = mux.NewRouter()
	router.StrictSlash(true)

	router.Handle("/user/{id}", auth.HandleGetUserByID(dependencies.AuthService)).Methods(
		http.MethodGet,
	)

	router.Handle("/podcast/{id}/like", podcast.HandleLikePodcast(dependencies.PodcastService)).Methods(
		http.MethodPost,
	)
	

	router.Handle("/podcast/{id}", podcast.HandleGetPodcastByID(dependencies.PodcastService)).Methods(
		http.MethodGet,
	)
	
	return
}
