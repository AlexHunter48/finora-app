import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Sidebar from "../components/Sidebar";

import { DashboardProvider } from "../context/DashboardContext";
export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <Outlet />
        </main>

        <BottomNav />
      </div>
    </DashboardProvider>
  );
}
