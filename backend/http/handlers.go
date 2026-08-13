package http

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"todo/postgres"
	"todo/todo"

	"github.com/gorilla/mux"
)

type HTTPHandlers struct {
	todoList *todo.List
}

func NewHTTPHandlers(todoList *todo.List) *HTTPHandlers {
	return &HTTPHandlers{
		todoList: todoList,
	}
}

type HTTPHandlers2 struct {
	taskRepository postgres.TaskRepository
}

func NewHTTPHandlers2(taskRepository postgres.TaskRepository) *HTTPHandlers2 {
	return &HTTPHandlers2{
		taskRepository: taskRepository,
	}
}

func SetError(w http.ResponseWriter, err error, expected error, status int) {
	errDTO := NewErrDTO(err.Error())

	if errors.Is(err, expected) {
		http.Error(w, errDTO.ToString(), status)
	} else {
		http.Error(w, errDTO.ToString(), http.StatusInternalServerError)
	}
}

/*
pattern: /tasks
method:  POST
info:    JSON in HTTP request body
*/
func (h *HTTPHandlers2) HandleCreateTask(w http.ResponseWriter, r *http.Request) {
	var taskDTO TaskDTO
	if err := json.NewDecoder(r.Body).Decode(&taskDTO); err != nil {
		errDTO := NewErrDTO(err.Error())

		http.Error(w, errDTO.ToString(), http.StatusBadRequest)
		return
	}

	if err := taskDTO.ValidateToCreateTask(); err != nil {
		errDTO := NewErrDTO(err.Error())

		http.Error(w, errDTO.ToString(), http.StatusBadRequest)
		return
	}

	task := todo.NewTask(taskDTO.Title, taskDTO.Description)
	if err := h.taskRepository.AddTask(task); err != nil {
		SetError(w, err, todo.ErrTaskAlreadyExists, http.StatusConflict)
		return
	}

	b, err := json.MarshalIndent(task, "", "  ")
	if err != nil {
		panic(err)
	}

	w.WriteHeader(http.StatusCreated)
	if _, err := w.Write(b); err != nil {
		fmt.Println("failed to write http response:", err)
		return
	}
}

/*
pattern: /tasks/{title}
method:	 GET
info: 	 in pattern
*/
func (h *HTTPHandlers) HandleGetTask(w http.ResponseWriter, r *http.Request) {
	title := mux.Vars(r)["title"]

	task, err := h.todoList.GetTask(title)
	if err != nil {
		SetError(w, err, todo.ErrTaskNotFound, http.StatusNotFound)
		return
	}

	b, err := json.MarshalIndent(task, "", " ")
	if err != nil {
		panic(err)
	}

	w.WriteHeader(http.StatusOK)
	if _, err := w.Write(b); err != nil {
		fmt.Println("failed to write http response:", err)
		return
	}
}

/*
pattern: /tasks
method:	 GET
info: 	 -
*/
func (h *HTTPHandlers) HandleGetAllTasks(w http.ResponseWriter, r *http.Request) {
	tasks := h.todoList.ListTasks()

	b, err := json.MarshalIndent(tasks, "", " ")
	if err != nil {
		panic(err)
	}

	w.WriteHeader(http.StatusOK)
	if _, err := w.Write(b); err != nil {
		fmt.Println("failed to write http response:", err)
		return
	}
}

/*
pattern: /tasks?complete=true|false
method:	 GET
info: 	 query params
*/
func (h *HTTPHandlers) HandleGetFilteredTasks(w http.ResponseWriter, r *http.Request) {
	completed, err := strconv.ParseBool(r.URL.Query().Get("completed"))
	if err != nil {
		errDTO := NewErrDTO(err.Error())
		http.Error(w, errDTO.ToString(), http.StatusBadRequest)
		return
	}

	var tasksList map[string]todo.Task

	if completed {
		tasksList = h.todoList.ListCompletedTasks()
	} else {
		tasksList = h.todoList.ListUncompletedTasks()
	}

	b, err := json.MarshalIndent(tasksList, "", "  ")
	if err != nil {
		panic(err)
	}

	w.WriteHeader(http.StatusOK)
	if _, err := w.Write(b); err != nil {
		fmt.Println("failed to write http response:", err)
		return
	}
}

/*
pattern: /tasks/{title}
method:  PATCH
info: 	 pattern + JSON in body
*/
func (h *HTTPHandlers) HandleCompleteTask(w http.ResponseWriter, r *http.Request) {
	var completeDTO CompleteTaskDTO
	if err := json.NewDecoder(r.Body).Decode(&completeDTO); err != nil {
		errDTO := NewErrDTO(err.Error())
		http.Error(w, errDTO.ToString(), http.StatusBadRequest)
		return
	}

	title := mux.Vars(r)["title"]

	var (
		task todo.Task
		err  error
	)

	if completeDTO.Complete {
		task, err = h.todoList.CompleteTask(title)
	} else {
		task, err = h.todoList.UncompleteTask(title)
	}

	if err != nil {
		SetError(w, err, todo.ErrTaskNotFound, http.StatusNotFound)
		return
	}

	b, err := json.MarshalIndent(task, "", "  ")
	if err != nil {
		panic(err)
	}

	w.WriteHeader(http.StatusOK)
	if _, err := w.Write(b); err != nil {
		fmt.Println("failed to write http response:", err)
		return
	}
}

/*
pattern: /tasks/{title}
method:	 DELETE
info: 	 in pattern
*/
func (h *HTTPHandlers) HandleDeleteTask(w http.ResponseWriter, r *http.Request) {
	title := mux.Vars(r)["title"]

	if err := h.todoList.DeleteTask(title); err != nil {
		SetError(w, err, todo.ErrTaskNotFound, http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
