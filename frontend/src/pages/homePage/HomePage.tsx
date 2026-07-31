import { useEffect, useState } from "react";

import { http, ROUTES } from "@shared";

import "./homePage.css";
import { Link } from "react-router-dom";

type Task = {
  Title: string;
  Description: string;
  IsCompleted: boolean;
  CompletedAt: string;
  CreatedAt: string;
};

export const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    http.get("/tasks").then((res) => {
      setTasks(Object.values(res.data));
    });
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <>
      <Link to={ROUTES.CREATE}>создать</Link>

      <div className="tasksWrapper">
        {tasks.map((task) => {
          return (
            <div className="task" key={task.Title}>
              <h2>{task.Title}</h2>
              <p>{task.Description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
