package postgres

import (
	"context"
	"todo/todo"

	"github.com/jackc/pgx/v5"
)

type TaskRepository struct {
	db *pgx.Conn
	ctx context.Context
}

func NewTaskRepository(db *pgx.Conn, ctx context.Context) TaskRepository {
	return TaskRepository{
		db: db,
		ctx: ctx,
	}
}

func (t TaskRepository) AddTask(task todo.Task) error {
	query := `
		INSERT INTO tasks (
			title,
			description,
			user_id,
			is_completed,
			completed_at,
			created_at
		)
		VALUES ($1, $2, $3, $4, $5, $6)
	`

	_, err := t.db.Exec(
		t.ctx,
		query,
		task.Title,
		task.Description,
		task.UserID,
		task.IsCompleted,
		task.CompletedAt,
		task.CreatedAt,
	)	

	if err != nil {
		return err
	}

	return nil
}
// func (r *TaskRepository) AddTask(task todo.Task) error {
// 	r.db.Conn()
// }
// func (r *TaskRepository) GetTask(...)
// func (r *TaskRepository) ListTasks(...)

// ListUncompletedTasks() (map[string]Task, error)
// 	ListCompletedTasks() (map[string]Task, error)
// 	CompleteTask(title string) (Task, error)
// 	UncompleteTask(title string) (Task, error)
// 	DeleteTask(title string) error


// func (l *List) AddTask(task Task) error {
// 	l.mtx.Lock()
// 	defer l.mtx.Unlock()

// 	if _, ok := l.tasks[task.Title]; ok {
// 		return ErrTaskAlreadyExists
// 	}

// 	l.tasks[task.Title] = task

// 	return nil
// }
