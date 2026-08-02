import { Route, Routes } from "react-router-dom";

import { MainLayout } from "@app";

import { CreatePage, HomePage, TaskPage } from "@pages";

import { ROUTES } from "@shared";

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.MAIN} element={<HomePage />} />
          <Route path={ROUTES.CREATE} element={<CreatePage />} />
          <Route path={ROUTES.TASK_BY_TITLE} element={<TaskPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
