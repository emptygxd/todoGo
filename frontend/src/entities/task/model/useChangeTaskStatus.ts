import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus, type Task } from "@entities";

export const useChangeTaskStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ title, completed }: { title: string; completed: boolean }) =>
      updateTaskStatus(title, completed),

    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (old: Task[]) =>
        old?.map((task: Task) =>
          task.Title === updatedTask.Title ? updatedTask : task,
        ),
      );
    },
  });

  return {
    doneTask: (title: string, completed: boolean) =>
      mutation.mutateAsync({
        title,
        completed,
      }),
  };
};
