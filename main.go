package main

import (
	"fmt"
	"todo/http"
	"todo/todo"
)

func main() {
	todoList := todo.NewList()
	handlers := http.NewHTTPHandlers(todoList)
	server := http.NewHTTPServer(handlers)

	if err := server.StartServer(); err != nil {
		fmt.Println("failed to start  server")
	}
}
