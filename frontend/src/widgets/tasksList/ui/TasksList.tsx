import { TaskCard, type Task } from "@entities";

import style from "./tasksList.module.css";

type Props = {
  tasks: Task[];
  onDelete: (title: string) => void;
  onComplete: (title: string, completed: boolean) => void;
};

export const TasksList = ({ tasks, onDelete, onComplete }: Props) => {
  return (
    <div className={style.tasksWrapper}>
      {tasks.map((task) => (
        <TaskCard
          key={task.Title}
          task={task}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};
