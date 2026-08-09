import { deleteTask, type Task } from "@entities";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: (_, title) => {
      queryClient.setQueryData(["tasks"], (old: Task[]) =>
        old?.filter((task) => task.Title !== title),
      );
    },
  });

  return {
    deleteTask: mutation.mutateAsync,
  };
};
