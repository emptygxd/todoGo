import { useParams } from "react-router-dom";

import { useTaskByTitle } from "@entities";

export const TaskPage = () => {
  const { title = "" } = useParams();

  const { data: task, isLoading, isError, error } = useTaskByTitle(title);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(error);
    return <div>Error</div>;
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
