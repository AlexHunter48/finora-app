import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainLayout />} />
        <Route path="Login" element={<Login />} />
        <Route path="Sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
