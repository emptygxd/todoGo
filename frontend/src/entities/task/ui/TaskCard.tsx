import type { Task } from "@entities";

import { DoneIcon, GarbageIcon } from "@assets";

import styles from "./taskCard.module.css";
import { generatePath, Link } from "react-router-dom";
import { ROUTES } from "@shared";

type Props = {
  task: Task;
  onDelete: (title: string) => void;
  onComplete: (title: string) => void;
};

export const TaskCard = ({ task, onDelete, onComplete }: Props) => {
  return (
    <Link
      to={generatePath(ROUTES.TASK_BY_TITLE, { title: task.Title })}
      className={styles.task}
    >
      <div
        className={`${styles.taskImg} ${styles.garbage}`}
        onClick={(e) => {
          e.preventDefault();
          onDelete(task.Title);
        }}
      >
        <GarbageIcon />
      </div>

      <h2>{task.Title}</h2>

      <p>{task.Description}</p>

      <div
        className={`${styles.taskImg} ${styles.done}`}
        onClick={(e) => {
          e.preventDefault();
          onComplete(task.Title);
        }}
      >
        <DoneIcon />
      </div>
    </Link>
  );
};
