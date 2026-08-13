package http

import (
	"errors"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type HTTPServer struct {
	httpHandlers *HTTPHandlers
}

func NewHTTPServer(httpHandlers *HTTPHandlers) *HTTPServer {
	return &HTTPServer{
		httpHandlers: httpHandlers,
	}
}

type HTTPServer2 struct {
	httpHandlers *HTTPHandlers2
}

func NewHTTPServer2(httpHandlers *HTTPHandlers2) *HTTPServer2 {
	return &HTTPServer2{
		httpHandlers: httpHandlers,
	}
}

func (s *HTTPServer2) StartServer() error {
	router := mux.NewRouter()

	router.Path("/tasks").Methods("POST").HandlerFunc(s.httpHandlers.HandleCreateTask)
	// router.Path("/tasks/{title}").Methods("GET").HandlerFunc(s.httpHandlers.HandleGetTask)
	// router.Path("/tasks").Methods("GET").Queries("completed", "{completed}").HandlerFunc((s.httpHandlers.HandleGetFilteredTasks))
	// router.Path("/tasks").Methods("GET").HandlerFunc(s.httpHandlers.HandleGetAllTasks)
	// router.Path("/tasks/{title}").Methods("PATCH").HandlerFunc(s.httpHandlers.HandleCompleteTask)
	// router.Path("/tasks/{title}").Methods("DELETE").HandlerFunc(s.httpHandlers.HandleDeleteTask)

	cors := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:5173"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PATCH", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	if err := http.ListenAndServe(":9090", cors(router)); err != nil {
		if errors.Is(err, http.ErrServerClosed) {
			return nil
		}
		return err
	}

	return nil
}
