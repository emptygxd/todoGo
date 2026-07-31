import { useState } from "react";
import "./createPage.css";
import { http } from "@shared";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="createWrapper">
      <div className="createContainer">
        <h1>CreatePage</h1>

        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleClick}>Создать</button>
        {error ?? <div>{error}</div>}
      </div>
    </div>
  );
};
