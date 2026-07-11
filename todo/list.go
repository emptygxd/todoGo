package todo

import (
	"sync"
)

type List struct {
	tasks map[string]Task
	mtx   sync.RWMutex
}

func NewList() *List {
	return &List{
		tasks: make(map[string]Task),
	}
}

func (l *List) AddTask(task Task) error {
	l.mtx.Lock()
	defer l.mtx.Unlock()

	if _, ok := l.tasks[task.Title]; ok {
		return ErrTaskAlreadyExists
	}

	l.tasks[task.Title] = task

	return nil
}

func (l *List) GetTask(title string) (Task, error) {
	l.mtx.RLock()
	defer l.mtx.RUnlock()

	task, ok := l.tasks[title]
	if !ok {
		return Task{}, ErrTaskNotFound
	}

	return task, nil
}

func (l *List) ListTasks() map[string]Task {
	l.mtx.RLock()
	defer l.mtx.RUnlock()

	temp := make(map[string]Task, len(l.tasks))

	for k, v := range l.tasks {
		temp[k] = v
	}

	return temp
}

func (l *List) ListUncomplitedTasks() map[string]Task {
	l.mtx.RLock()
	defer l.mtx.RUnlock()

	temp := make(map[string]Task, len(l.tasks))

	for k, v := range l.tasks {
		if !v.IsCompleted {
			temp[k] = v
		}
	}

	return temp
}

func (l *List) ListCompletedTasks() map[string]Task {
	l.mtx.RLock()
	defer l.mtx.RUnlock()

	temp := make(map[string]Task, len(l.tasks))

	for k, v := range l.tasks {
		if v.IsCompleted {
			temp[k] = v
		}
	}

	return temp
}

func (l *List) CompleteTask(title string) (Task, error) {
	l.mtx.RLock()
	defer l.mtx.RUnlock()

	v, ok := l.tasks[title]
	if !ok {
		return Task{}, ErrTaskNotFound
	}

	v.Complete()

	l.tasks[title] = v

	return v, nil
}

func (l *List) UncompleteTask(title string) (Task, error) {
	l.mtx.RLock()
	defer l.mtx.RUnlock()

	v, ok := l.tasks[title]
	if !ok {
		return Task{}, ErrTaskNotFound
	}

	v.Uncomplete()

	l.tasks[title] = v

	return v, nil
}

func (l *List) DeleteTask(title string) error {
	l.mtx.Lock()
	defer l.mtx.Unlock()

	if _, ok := l.tasks[title]; !ok {
		return ErrTaskNotFound
	}

	delete(l.tasks, title)

	return nil
}
