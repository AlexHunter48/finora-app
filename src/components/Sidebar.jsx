import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  TrendingUp,
  Wallet,
  Target,
  BarChart2,
  Settings,
  ChevronDown,
} from "lucide-react";
export default function Sidebar() {
  const links = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Overview",
    },
    {
      to: "/dashboard/subscriptions",
      icon: <CreditCard size={20} />,
      label: "Subscriptions",
    },
    {
      to: "/dashboard/transactions",
      icon: <ArrowLeftRight size={20} />,
      label: "Transactions",
    },
    {
      to: "/dashboard/spending",
      icon: <TrendingUp size={20} />,
      label: "Spending",
    },
    { to: "/dashboard/budgets", icon: <Wallet size={20} />, label: "Budgets" },
    { to: "/dashboard/goals", icon: <Target size={20} />, label: "Goals" },
    {
      to: "/dashboard/reports",
      icon: <BarChart2 size={20} />,
      label: "Reports",
    },
    {
      to: "/dashboard/settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
  ];

  return (
    <aside className="hidden min-h-screen w-56 flex-col justify-between border-r border-white/[0.06] bg-[#0F0E0D] px-4 py-6 lg:flex">
      <div>
        <NavLink to="/dashboard">
          <h2 className="mb-10 px-3 text-xl font-semibold tracking-[0.3em] text-[#F5F5F4]">
            FINORA
          </h2>
        </NavLink>

        <nav>
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#C96F35]/15 text-[#C96F35]"
                        : "text-[#A8A39B] hover:bg-white/[0.04] hover:text-[#F5F5F4]"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <div className="mb-4 border-t border-white/[0.06]" />
        <div className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 hover:bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C96F35] text-xs font-bold text-white">
              A
            </div>
            <div>
              <div className="text-sm font-medium text-[#F5F5F4]">
                Alex Hunter
              </div>
              <div className="text-xs text-[#6D6A66]">alex@example.com</div>
            </div>
          </div>
          <ChevronDown size={16} className="text-[#6D6A66]" />
        </div>
      </div>
    </aside>
  );
}
