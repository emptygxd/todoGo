import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getTasks, deleteTask, updateTaskStatus, type Task } from "@entities";

export const useTasks = () => {
  const [status, setStatus] = useState("false");

  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, title) => {
      queryClient.setQueryData(["tasks"], (old: Task[]) =>
        old?.filter((task: Task) => task.Title !== title),
      );
    },
  });

  const doneMutation = useMutation({
    mutationFn: (title: string) => updateTaskStatus(title, status !== "true"),

    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (old: Task[]) =>
        old?.map((task: Task) =>
          task.Title === updatedTask.Title ? updatedTask : task,
        ),
      );
    },
  });

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        status === "true" ? task.IsCompleted : !task.IsCompleted,
      ),
    [tasks, status],
  );

  return {
    tasks: filteredTasks,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    status,
    setStatus,
    deleteTask: deleteMutation.mutateAsync,
    doneTask: doneMutation.mutateAsync,
    refetch,
  };
};
