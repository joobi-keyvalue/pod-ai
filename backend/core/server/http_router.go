package server

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/keycode/podai/auth"
	"github.com/keycode/podai/topic"
	"github.com/keycode/podai/userTopic"
	"github.com/keycode/podai/podcast"
	"github.com/keycode/podai/tts"
)

func initRouter(dependencies Dependencies) (router *mux.Router) {
	router = mux.NewRouter()
	router.StrictSlash(true)

	router.Handle("/users/{id}", auth.HandleGetUserByID(dependencies.AuthService)).Methods(
		http.MethodGet,
	)

	router.Handle("/login", auth.HandleLogin(dependencies.AuthService)).Methods(
		http.MethodPost,
	)

	router.Handle("/create-user", auth.HandleCreateUser(dependencies.AuthService)).Methods(
		http.MethodPost,
	)

	router.Handle("/topics", topic.HandleGetAllTopics(dependencies.TopicService)).Methods(
		http.MethodGet,
	)

	router.Handle("/users/{user_id}/topics", userTopic.HandleAddUserTopic(dependencies.UserTopicService)).Methods(
		http.MethodPost,
	)

	router.Handle("/users/{user_id}/topics", userTopic.HandleGetUserTopics(dependencies.UserTopicService)).Methods(
		http.MethodGet,
	)

	router.Handle("/podcast/{id}/like", podcast.HandleLikePodcast(dependencies.PodcastService)).Methods(
		http.MethodPost,
	)

	router.Handle("/podcast/{id}", podcast.HandleGetPodcastByID(dependencies.PodcastService)).Methods(
		http.MethodGet,
	)

	router.Handle("/podcasts", podcast.HandleGetPodcasts(dependencies.PodcastService)).Methods(
		http.MethodGet,
	)

	router.Handle("/podcast/{id}/sources", podcast.HandleGetSourcesByPodcastID(dependencies.PodcastService)).Methods(
		http.MethodGet,
	)

	router.Handle("/verify-otp", auth.HandleVerifyOTP(dependencies.AuthService)).Methods(
		http.MethodPost,
	)

	router.Handle("/generate-tts", tts.HandleStartTTS(dependencies.TTSService)).Methods(
		http.MethodPost,
	)

	return
}
