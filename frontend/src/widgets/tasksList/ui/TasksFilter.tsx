import { TriangleIcon } from "@assets";

import styles from "./tasksFilter.module.css";
import { useState } from "react";

type Props = {
  status: string;
  setStatus: (value: string) => void;
};

export const TasksFilter = ({ status, setStatus }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className={`${styles.select} ${isOpen ? styles.open : ""}`}
        onMouseDown={() => setIsOpen((prev) => !prev)}
        onBlur={() => setIsOpen(false)}
      >
        <option value="false">Невыполненные</option>

        <option value="true">Выполненные</option>
      </select>

      <TriangleIcon className={styles.icon} />
    </div>
  );
};
