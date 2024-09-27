package server

import (
	"context"
	"fmt"
	"github.com/keycode/podai/config"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"sync"
	"syscall"

	"github.com/gorilla/handlers"
	"github.com/keycode/podai/logger"
	"golang.org/x/sync/errgroup"
)

func Start() (err error) {
	dependencies, err := NewDependencies()
	if err != nil {
		return
	}

	wg := new(sync.WaitGroup)

	wg.Add(1)

	mainCtx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	go func() {
		startServers(mainCtx, dependencies)
		wg.Done()
	}()

	wg.Wait()
	return
}

func startServers(ctx context.Context, dependencies Dependencies) (err error) {
	port := config.ReadEnvInt("APP_PORT")
	addr := fmt.Sprintf(":%s", strconv.Itoa(port))

	muxRouter := initRouter(dependencies)

	// cors configuration for front-end
	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	corsHandler := handlers.CORS(headersOk, originsOk, methodsOk)(muxRouter)

	httpServer := &http.Server{
		Addr:    addr,
		Handler: corsHandler,
	}

	g, gCtx := errgroup.WithContext(ctx)

	g.Go(func() error {
		err := startHTTPServer(dependencies, httpServer)
		if err != nil {
			logger.Info(context.Background(), "http server stopped - %s", err.Error())
		}
		//setting this nil as we are already panicking if server does not start
		return nil
	})

	g.Go(func() (err error) {
		<-gCtx.Done()
		logger.Info(context.Background(), "shutting down API server %s", addr)
		err = httpServer.Shutdown(context.Background())

		return err
	})

	if err = g.Wait(); err != nil {
		logger.Info(context.Background(), "shutting down servers %s", err.Error())
	}

	return
}
