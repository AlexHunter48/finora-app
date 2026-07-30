import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  LogOut,
} from "lucide-react";
import { useDash } from "../context/DashboardContext";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { isOpen, setIsOpen } = useDash();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleClose = (e) => {
    e?.stopPropagation();
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout();
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      handleClose();
      navigate("/login");
    }
  };

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

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AH";

  return (
    <>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
        />
      )}

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

        <div className="relative pt-4">
          <div className="mb-4 border-t border-white/[0.06]" />

          {showProfileMenu && (
            <div className="animate-in fade-in slide-in-from-bottom-2 absolute bottom-full left-0 mb-2 w-full rounded-xl border border-white/[0.1] bg-[#181715] p-1.5 shadow-2xl backdrop-blur-md duration-150">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-400 transition hover:bg-rose-500/10"
              >
                <LogOut size={15} />
                <span>Log Out</span>
              </button>
            </div>
          )}

          <div
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/[0.04] bg-[#1A1917]/80 p-2.5 transition-all duration-200 hover:border-white/[0.1] hover:bg-[#1A1917]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#C9733D] to-[#E28B51] text-xs font-bold text-white shadow-sm ring-2 ring-white/10">
                  {initials}
                </div>
                <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-[#45C27A] ring-2 ring-[#141311]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#F5F5F5]">
                  {user?.name || "User Account"}
                </p>
                <p className="truncate text-[11px] text-[#8F8A84]">
                  {user?.email || "user@email.com"}
                </p>
              </div>
            </div>

            <ChevronDown
              size={16}
              className={`shrink-0 text-[#8F8A84] transition-transform duration-200 group-hover:text-[#F5F5F5] ${
                showProfileMenu ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
