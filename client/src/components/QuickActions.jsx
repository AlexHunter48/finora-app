import {
  ArrowLeftRight,
  CreditCard,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const actions = [
  {
    title: "Subscriptions",
    icon: (
      <CreditCard size={30} strokeWidth={1.8} className={"text-orange-500"} />
    ),
    to: "/dashboard/subscriptions",
  },
  {
    title: "Transactions",
    icon: (
      <ArrowLeftRight
        size={30}
        strokeWidth={1.8}
        className={"text-green-700"}
      />
    ),
    to: "/dashboard/transactions",
  },
  {
    title: "Spending",
    icon: (
      <TrendingUp size={30} className={"text-blue-400"} strokeWidth={1.8} />
    ),
    to: "/dashboard/spending",
  },
  {
    title: "Budgets",
    icon: <Wallet size={30} strokeWidth={1.8} className={"text-orange-400"} />,
    to: "/dashboard/budgets",
  },
  {
    title: "Goals",
    icon: <Target size={30} strokeWidth={1.8} className={"text-green-700"} />,
    to: "/dashboard/goals",
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#F5F5F5]">Quick Actions</h3>

        <button className="text-sm font-medium text-[#BE6A37] transition hover:text-[#D47A44]">
          View all
        </button>
      </div>

      <div className="scrollbar-hide grid grid-cols-3 gap-4 overflow-x-auto lg:grid-cols-5">
        {actions.map((action) => (
          <NavLink
            key={action.title}
            to={action.to}
            className="group flex flex-col items-center justify-center rounded-[8px] border border-white/[0.05] bg-[#1A1917] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#BE6A37] hover:shadow-[0_20px_50px_rgba(0,0,0,.35)]"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25211D] text-[#BE6A37] transition-all duration-300 group-hover:bg-[#BE6A37] group-hover:text-white">
              {action.icon}
            </div>

            <div className="whitespace-nowrap">
              <p className="text-sm font-medium text-[#F5F5F5]">
                {action.title}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}
