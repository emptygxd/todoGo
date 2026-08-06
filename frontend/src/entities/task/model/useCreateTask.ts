import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { createTask } from "@entities";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [error, setError] = useState<null | "">(null);

  const createMutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      navigate("/");
    },

    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.Message ?? "Неизвестная ошибка");
      }
    },
  });

  return { createMutation, error };
};
