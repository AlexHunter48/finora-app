import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Sidebar from "../components/Sidebar";

import { DashboardProvider } from "../context/DashboardContext";
export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0F0E0D] text-[#F5F5F5]">
        {" "}
        <Sidebar />
        <main className="h-full flex-1 overflow-y-auto pb-20 lg:pb-0">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </DashboardProvider>
  );
}
