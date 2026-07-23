import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/Overview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainLayout />} />
        <Route path="Login" element={<Login />} />
        <Route path="Sign-up" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardLayout />} >
        <Route index element={<Overview/>}/>
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
