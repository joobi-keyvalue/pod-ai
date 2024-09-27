package podcast

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/keycode/podai/api"
	"github.com/keycode/podai/constants"
	"github.com/keycode/podai/logger"
)

func HandleLikePodcast(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		id := vars["id"]
		podcastID, err := strconv.ParseInt(id, 10, 64)

		err = service.LikePodcast(req.Context(), podcastID)
		if err != nil {
			logger.Error(req.Context(), "error liking podcast", err.Error(), "podcast_id", id)
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error:        "error liking podcast",
				ResponseCode: api.INTERNAL_ERROR,
			})
			return
		}

		api.RespondWithJSON(res, http.StatusOK, api.Response{
			ResponseCode: api.SUCCESS,
		})
	})
}

func HandleGetPodcastByID(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		// Extract podcast ID from URL path variables
		vars := mux.Vars(req)
		id := vars["id"]
		podcastID, err := strconv.ParseInt(id, 10, 64)
		if err != nil {
			logger.Error(ctx, "invalid podcast ID", err.Error(), "podcast_id", id)
			api.RespondWithError(res, http.StatusBadRequest, api.Response{
				Error:        "invalid podcast ID",
				ResponseCode: api.BAD_REQUEST,
			})
			return
		}

		// Call the service to fetch the podcast by ID
		podcast, err := service.GetPodcastByID(req.Context(), podcastID)
		if err != nil {
			logger.Error(ctx, "error fetching podcast", err.Error(), "podcast_id", id)
			if err == constants.ErrPodcastNotFound {
				api.RespondWithError(res, http.StatusNotFound, api.Response{
					Error:        "podcast not found",
					ResponseCode: api.NOT_FOUND,
				})
				return
			}
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error:        "error fetching podcast",
				ResponseCode: api.INTERNAL_ERROR,
			})
			return
		}

		// Respond with the podcast data in JSON format
		api.RespondWithJSON(res, http.StatusOK, api.Response{
			Data: podcast,
		})
	})
}

func HandleGetPodcasts(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		vars := mux.Vars(req)
		userID := vars["user_id"]
		// Parse query parameters
		limit, err := strconv.Atoi(req.URL.Query().Get("limit"))
		if err != nil || limit <= 0 {
			limit = 10 // Default limit
		}

		offset, err := strconv.Atoi(req.URL.Query().Get("offset"))
		if err != nil || offset < 0 {
			offset = 0 // Default offset
		}

		isLiked, err := strconv.ParseBool(req.URL.Query().Get("is_liked"))
		if err != nil {
			isLiked = false
		}

		// Call the service to fetch podcasts
		podcasts, err := service.GetPodcasts(ctx, userID, limit, offset, isLiked)
		if err != nil {
			logger.Error(ctx, "error fetching podcasts", err.Error())
			if err == constants.ErrPodcastNotFound {
				api.RespondWithError(res, http.StatusNotFound, api.Response{
					Error:        "podcast not found",
					ResponseCode: api.NOT_FOUND,
				})
				return
			}
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error:        "error fetching podcasts",
				ResponseCode: api.INTERNAL_ERROR,
			})
			return
		}

		// Respond with the podcasts data in JSON format
		api.RespondWithJSON(res, http.StatusOK, api.Response{
			Data: podcasts,
		})
	})
}

func HandleGetSourcesByPodcastID(service Service) http.HandlerFunc {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		vars := mux.Vars(req)
		id := vars["id"]
		podcastID, err := strconv.ParseInt(id, 10, 64)
		if err != nil {
			logger.Error(ctx, "invalid podcast ID", err.Error(), "podcast_id", id)
			api.RespondWithError(res, http.StatusBadRequest, api.Response{
				Error:        "invalid podcast ID",
				ResponseCode: api.BAD_REQUEST,
			})
			return
		}

		sources, err := service.GetSourcesByPodcastID(ctx, podcastID)
		if err != nil {
			logger.Error(ctx, "error fetching sources by podcast ID", err.Error(), "podcast_id", id)
			if err == constants.ErrSourcesNotFound {
				api.RespondWithError(res, http.StatusNotFound, api.Response{
					Error:        "sources not found",
					ResponseCode: api.NOT_FOUND,
				})
				return
			}
			api.RespondWithError(res, http.StatusInternalServerError, api.Response{
				Error:        "error fetching sources by podcast ID",
				ResponseCode: api.INTERNAL_ERROR,
			})
			return
		}

		api.RespondWithJSON(res, http.StatusOK, api.Response{
			Data: sources,
		})
	})
}
