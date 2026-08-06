import { useState } from "react";

import { useCreateTask } from "@entities";

import { Button, Input } from "@shared";

import styles from "./createPage.module.css";

export const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { createMutation, error } = useCreateTask();

  const handleClick = async () => {
    createMutation.mutate({
      title: title.trim(),
      description: description.trim(),
    });
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
