package todo

import "errors"

var ErrTaskAlreadyExists = errors.New("This task already exists")
var ErrTaskNotFound = errors.New("Task not found")
