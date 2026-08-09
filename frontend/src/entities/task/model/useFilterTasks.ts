import type { Task } from "@entities";
import { useMemo, useState } from "react";

export const useTaskFilter = (tasks: Task[]) => {
  const [status, setStatus] = useState("false");

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        status === "true" ? task.IsCompleted : !task.IsCompleted,
      ),
    [tasks, status],
  );

  return {
    tasks: filteredTasks,
    status,
    setStatus,
  };
};
