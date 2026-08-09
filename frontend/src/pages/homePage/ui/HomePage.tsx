import { TasksFilter, TasksList } from "@widgets";

import styles from "./homePage.module.css";
import {
  useChangeTaskStatus,
  useDeleteTask,
  useTaskFilter,
  useTasks,
} from "@entities";

export const HomePage = () => {
  const { data = [], isLoading, isError, error } = useTasks();

  const { tasks, status, setStatus } = useTaskFilter(data);

  const { deleteTask } = useDeleteTask();

  const { doneTask } = useChangeTaskStatus();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return console.log(error);

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
