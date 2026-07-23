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
      icon: LayoutDashboard,
      label: "Overview",
    },
    {
      to: "/dashboard/subscriptions",
      icon: CreditCard,
      label: "Subscriptions",
    },
    {
      to: "/dashboard/spending",
      icon: TrendingUp,
      label: "Spending",
    },
    {
      to: "/dashboard/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-40 border-t border-white/[0.08] bg-[#141311]/85 px-2 pt-2 pb-5 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/dashboard"}
              className={({ isActive }) =>
                `group relative flex flex-1 flex-col items-center justify-center py-1 transition-all duration-200 ${
                  isActive
                    ? "text-[#C9733D]"
                    : "text-[#8F8A84] hover:text-[#F5F5F5]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute -top-[9px] h-[3px] w-8 rounded-full bg-[#C9733D] shadow-[0_0_12px_#C9733D]" />
                  )}

                  <div
                    className={`flex h-7 w-7 items-center justify-center transition-transform duration-200 ${
                      isActive
                        ? "scale-110 text-[#C9733D]"
                        : "group-active:scale-95"
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                  </div>

                  <span
                    className={`mt-1 text-[10px] font-semibold tracking-tight transition-colors duration-200 ${
                      isActive ? "text-[#F5F5F5]" : "text-[#8F8A84]"
                    }`}
                  >
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
