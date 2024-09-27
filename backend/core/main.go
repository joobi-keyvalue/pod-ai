package main

import (
	"fmt"
	"os"

	"github.com/keycode/podai/app"
	"github.com/keycode/podai/server"

	"github.com/urfave/cli/v2"
)

func main() {
	if err := NewPodaiService().Run(os.Args); err != nil {
		fmt.Fprintf(os.Stderr, "error: %v\n", err)
		os.Exit(1)
	}
}

func NewPodaiService() (cliApp *cli.App) {
	cliApp = cli.NewApp()
	cliApp.Name = "DurianPay Auth Service"
	cliApp.Version = "1.0.0"

	cliApp.Before = func(context *cli.Context) error {
		return Init()
	}

	cliApp.After = func(context *cli.Context) error {
		return Close()
	}

	cliApp.Commands = append(cliApp.Commands,
		NewServerCommand(),
	)

	return
}

func Init() (err error) {
	err = app.Init()
	if err != nil {
		return
	}

	return
}

func Close() (err error) {
	app.Close()
	return
}

func NewServerCommand() (cmd *cli.Command) {
	cmd = &cli.Command{
		Name:  "start",
		Usage: "start server",
		Action: func(c *cli.Context) error {
			return server.Start()
		},
	}

	return
}
