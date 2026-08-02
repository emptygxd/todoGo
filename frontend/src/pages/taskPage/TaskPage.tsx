import { useEffect, useState } from "react";

import { http } from "@shared";
import { useParams } from "react-router-dom";
import type { Task } from "@entities";

export const TaskPage = () => {
  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState(true);
  const { title } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await http.get(`/tasks/${title}`);
        setTask(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Задача не найдена</div>;
  }

  return (
    <>
      <div className="createWrapper">
        <div className="createContainer">
          <h1>TaskPage</h1>

          <p>Title: {task.Title}</p>
          <p>Description: {task.Description}</p>
          <p>Completed: {String(task.IsCompleted)}</p>
          <p>Created At: {new Date(task.CreatedAt).toLocaleString("ru-RU")}</p>
          {task.IsCompleted && (
            <p>
              Completed At: {new Date(task.CompletedAt).toLocaleString("ru-RU")}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
