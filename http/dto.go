package http

import (
	"encoding/json"
	"errors"
	"time"
)

type CompleteTaskDTO struct {
	Complete bool
}

type TaskDTO struct {
	Title       string
	Description string
}

func (t TaskDTO) ValidateToCreateTask() error {
	if t.Title == "" {
		return errors.New("Title is empty")
	}

	if t.Description == "" {
		return errors.New("Descripotion is empty")
	}

	return nil
}

type ErrDTO struct {
	Message string
	Time    time.Time
}

func NewErrDTO(message string) *ErrDTO {
	return &ErrDTO{
		Message: message,
		Time:    time.Now(),
	}
}

func (e *ErrDTO) ToString() string {
	data, err := json.MarshalIndent(e, "", "	")
	if err != nil {
		panic(err)
	}

	return string(data)
}
