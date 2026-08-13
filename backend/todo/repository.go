package todo

type TaskRepository interface {
	AddTask(task Task) error
	GetTask(title string) (Task, error)
	ListTasks() (map[string]Task, error)
	ListUncompletedTasks() (map[string]Task, error)
	ListCompletedTasks() (map[string]Task, error)
	CompleteTask(title string) (Task, error)
	UncompleteTask(title string) (Task, error)
	DeleteTask(title string) error
}