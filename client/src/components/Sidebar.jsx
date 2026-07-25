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
  X,
} from "lucide-react";
import { useDash } from "../context/DashboardContext";
import { useAuth } from "../context/AuthContext";
export default function Sidebar() {
  const { isOpen, setIsOpen } = useDash();

  const handleClose = (e) => {
    e?.stopPropagation();
    setIsOpen(false);
  };

  const { user } = useAuth();

  const links = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={19} />,
      label: "Overview",
    },
    {
      to: "/dashboard/subscriptions",
      icon: <CreditCard size={19} />,
      label: "Subscriptions",
    },
    {
      to: "/dashboard/transactions",
      icon: <ArrowLeftRight size={19} />,
      label: "Transactions",
    },
    {
      to: "/dashboard/spending",
      icon: <TrendingUp size={19} />,
      label: "Spending",
    },
    { to: "/dashboard/budgets", icon: <Wallet size={19} />, label: "Budgets" },
    { to: "/dashboard/goals", icon: <Target size={19} />, label: "Goals" },
    {
      to: "/dashboard/reports",
      icon: <BarChart2 size={19} />,
      label: "Reports",
    },
    {
      to: "/dashboard/settings",
      icon: <Settings size={19} />,
      label: "Settings",
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex h-dvh w-64 flex-col justify-between border-r border-white/[0.08] bg-[#141311] px-4 py-6 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="mb-8 flex items-center justify-between px-2">
            <NavLink
              to="/dashboard"
              className="flex items-center gap-3"
              onClick={handleClose}
            >
              <span className="text-lg font-bold tracking-[0.25em] text-[#F5F5F5]">
                FINORA
              </span>
            </NavLink>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close sidebar"
              className="relative z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/[0.08] bg-[#1D1C1A] text-[#8F8A84] transition-all hover:bg-white/[0.08] hover:text-[#F5F5F5] active:scale-95 lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          <nav>
            <ul className="flex flex-col gap-1.5">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/dashboard"}
                    onClick={handleClose}
                    className={({ isActive }) =>
                      `relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#C9733D]/15 font-semibold text-[#C9733D]"
                          : "text-[#8F8A84] hover:bg-white/[0.04] hover:text-[#F5F5F5]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute top-2 bottom-2 left-0 w-1 rounded-r-full bg-[#C9733D] shadow-[0_0_10px_#C9733D]" />
                        )}
                        <span
                          className={`transition-transform duration-200 ${
                            isActive ? "scale-110" : ""
                          }`}
                        >
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pt-4">
          <div className="mb-4 border-t border-white/[0.06]" />

          <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/[0.04] bg-[#1A1917]/80 p-2.5 transition-all duration-200 hover:border-white/[0.1] hover:bg-[#1A1917]">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#C9733D] to-[#E28B51] text-xs font-bold text-white shadow-sm ring-2 ring-white/10">
                  AH
                </div>
                <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-[#45C27A] ring-2 ring-[#141311]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#F5F5F5]">
                  {user?.name}
                </p>
                <p className="truncate text-[11px] text-[#8F8A84]">
                  {user?.email}
                </p>
              </div>
            </div>

            <ChevronDown
              size={16}
              className="shrink-0 text-[#8F8A84] transition-transform duration-200 group-hover:text-[#F5F5F5]"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
