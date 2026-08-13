CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  user_id INT NOT NULL REFERENCES users(id),
  is_completed BOOLEAN NOT NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,

  UNIQUE (user_id, title)
);