package podcast

import (
	"github.com/gorilla/mux"
	"github.com/keycode/podai/api"
	"github.com/keycode/podai/logger"
	"net/http"
	"strconv"
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
