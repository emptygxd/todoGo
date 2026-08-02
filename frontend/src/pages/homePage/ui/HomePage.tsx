import { useTasks } from "@pages";

import { TasksFilter, TasksList } from "@widgets";

import styles from "./homePage.module.css";

export const HomePage = () => {
  const { tasks, status, setStatus, deleteTask, doneTask, loading, error } =
    useTasks();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.filterWrapper}>
        <h2>{status !== "true" ? "Невыполненны" : "Выполненны"}:</h2>

        <TasksFilter status={status} setStatus={setStatus} />
      </div>
      <TasksList tasks={tasks} onDelete={deleteTask} onComplete={doneTask} />
    </>
  );
};
