import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainLayout />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
