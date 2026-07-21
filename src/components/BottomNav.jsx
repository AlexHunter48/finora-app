import {
  LayoutDashboard,
  CreditCard,
  TrendingUp,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const links = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={22} />,
      label: "Overview",
    },
    {
      to: "/dashboard/subscriptions",
      icon: <CreditCard size={22} />,
      label: "Subscriptions",
    },
    {
      to: "/dashboard/spending",
      icon: <TrendingUp size={22} />,
      label: "Spending",
    },
    {
      to: "/dashboard/settings",
      icon: <Settings size={22} />,
      label: "Settings",
    },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t border-white/[0.06] bg-[#0F0E0D] px-4 pt-3 pb-6 lg:hidden">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === "/dashboard"}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-[#C96F35]" : "text-[#6D6A66]"
            }`
          }
        >
          {link.icon}
          <span className="text-[10px] font-medium">{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
