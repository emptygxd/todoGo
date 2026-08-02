import { Link } from "react-router-dom";

import { ROUTES } from "@shared";

import styles from "./header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link to={ROUTES.MAIN}>
        <button>На главную</button>
      </Link>

      <Link to={ROUTES.CREATE}>
        <button>Создать</button>
      </Link>
    </div>
  );
};
