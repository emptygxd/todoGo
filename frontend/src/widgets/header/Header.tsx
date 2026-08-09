import { Link } from "react-router-dom";

import { Button, ROUTES } from "@shared";

import styles from "./header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link to={ROUTES.MAIN}>
        <Button>На главную</Button>
      </Link>

      <Link to={ROUTES.CREATE}>
        <Button>Создать</Button>
      </Link>
    </div>
  );
};
