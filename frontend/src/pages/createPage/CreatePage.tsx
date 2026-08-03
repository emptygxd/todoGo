import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Button, http, Input } from "@shared";

import styles from "./createPage.module.css";

export const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<null | "">(null);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await http.post("/tasks", {
        Title: title,
        Description: description,
      });

      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.Message ?? "Неизвестная ошибка");
      }
    }
  };

  return (
    <div className={styles.createWrapper}>
      <div className={styles.createContainer}>
        <h1>CreatePage</h1>

        <Input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button onClick={handleClick}>Создать</Button>
        {error ?? <div>{error}</div>}
      </div>
    </div>
  );
};
