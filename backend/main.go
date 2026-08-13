package main

import (
	"context"
	"fmt"
	"os"
	"todo/http"
	"todo/postgres"

	"github.com/jackc/pgx/v5"
)

func main() {
	ctx := context.Background()

	db, err := pgx.Connect(ctx, os.Getenv("CONN_STR"))
	
	if err != nil {
		fmt.Println(err)
	}
	
	defer db.Close(ctx)

	if err := db.Ping(ctx); err != nil {
		fmt.Println(err)
	}

	// todoList := todo.NewList()
	todoList2 := postgres.NewTaskRepository(db,ctx)
	handlers := http.NewHTTPHandlers2(todoList2)
	server := http.NewHTTPServer2(handlers)

	if err := server.StartServer(); err != nil {
		fmt.Println("failed to start  server:", err)
	}
}
