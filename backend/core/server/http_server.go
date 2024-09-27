package server

import (
	"context"
	"github.com/keycode/podai/logger"
	"net/http"
)

func startHTTPServer(dependencies Dependencies, server *http.Server) (err error) {
	logger.Info(context.Background(), "starting API server on %s", server.Addr)
	err = server.ListenAndServe()
	return
}
