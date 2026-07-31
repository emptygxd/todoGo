import { Route, Routes } from "react-router-dom";

import { CreatePage, HomePage } from "@pages";

import "./App.css";
import { ROUTES } from "@shared";

function App() {
  return (
    <div>
      <Routes>
        <Route path={ROUTES.MAIN} element={<HomePage />} />
        <Route path={ROUTES.CREATE} element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
