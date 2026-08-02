import type { Task } from "@entities";
import { http } from "@shared";

export const getTasks = async (): Promise<Task[]> => {
  const res = await http.get<Record<string, Task>>("/tasks");

  return Object.values(res.data);
};

export const deleteTask = async (title: string) => {
  await http.delete(`/tasks/${title}`);
};

export const updateTaskStatus = async (title: string, completed: boolean) => {
  const res = await http.patch(`/tasks/${title}`, {
    Complete: completed,
  });

  return res.data;
};
