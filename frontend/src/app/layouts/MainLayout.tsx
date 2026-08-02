import { Outlet } from "react-router-dom";
import { Header } from "@widgets";

import styles from "./mainLayouts.module.css";

export const MainLayout = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};
