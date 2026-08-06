import { getTaskByTitle } from "@entities";
import { useQuery } from "@tanstack/react-query";

export const useTaskByTitle = (title: string) => {
  return useQuery({
    queryKey: ["task", title],
    queryFn: () => getTaskByTitle(title),
    enabled: !!title,
  });
};
