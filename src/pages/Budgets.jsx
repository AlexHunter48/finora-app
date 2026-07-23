import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Target,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  Utensils,
  Zap,
  ShoppingBag,
  Code2,
  CheckCircle2,
} from "lucide-react";

const initialBudgets = [
  {
    id: "b1",
    category: "Subscriptions & Recurring",
    spent: 103000,
    limit: 110000,
    icon: CreditCard,
    color: "bg-[#C9733D]",
    badge: "bg-[#C9733D]/10 text-[#C9733D] border-[#C9733D]/20",
  },
  {
    id: "b2",
    category: "Food & Dining",
    spent: 28000,
    limit: 30000,
    icon: Utensils,
    color: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    id: "b3",
    category: "Development & SaaS",
    spent: 61000,
    limit: 50000, // Exceeded!
    icon: Code2,
    color: "bg-purple-500",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: "b4",
    category: "Utilities & Power",
    spent: 38000,
    limit: 45000,
    icon: Zap,
    color: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    id: "b5",
    category: "Shopping & Lifestyle",
    spent: 15000,
    limit: 40000,
    icon: ShoppingBag,
    color: "bg-blue-500",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
];

export default function Budgets() {
  const navigate = useNavigate();

  const totalSpent = initialBudgets.reduce((acc, b) => acc + b.spent, 0);
  const totalLimit = initialBudgets.reduce((acc, b) => acc + b.limit, 0);
  const overallPercentage = Math.round((totalSpent / totalLimit) * 100);

  return (
    <div className="min-h-screen bg-[#0F0E0D] px-4 py-6 pb-28 text-[#F5F5F5] sm:px-8 lg:px-10 lg:pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#141311] text-[#8F8A84] hover:text-[#F5F5F5]"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-xs font-medium tracking-wider text-[#8F8A84] uppercase">
              Spending Controls
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
              Monthly Budgets
            </h1>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9733D] to-[#D87F46] px-5 py-3 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(201,115,61,0.25)]">
          <Plus size={16} />
          <span>Set Category Budget</span>
        </button>
      </div>

      {/* Summary KPI Banner */}
      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#141311] p-5 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-[#8F8A84]">
              Overall Budget Capacity
            </p>
            <p className="mt-1 text-2xl font-bold text-[#F5F5F5]">
              ₦{totalSpent.toLocaleString()}{" "}
              <span className="text-sm font-normal text-[#8F8A84]">
                / ₦{totalLimit.toLocaleString()}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-4 py-2.5 text-xs">
            <Target size={16} className="text-[#C9733D]" />
            <span className="text-[#8F8A84]">
              Overall Utilized:{" "}
              <strong className="text-[#F5F5F5]">{overallPercentage}%</strong>
            </span>
          </div>
        </div>

        {/* Total Progress Bar */}
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-[#C9733D] transition-all"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* Budget Category Cards Grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {initialBudgets.map((b) => {
          const Icon = b.icon;
          const percent = Math.round((b.spent / b.limit) * 100);
          const isOver = b.spent > b.limit;
          const isWarning = percent >= 85 && !isOver;

          return (
            <div
              key={b.id}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141311] p-5 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${b.badge}`}
                    >
                      <Icon size={18} />
                    </div>
                    <h3 className="text-sm font-semibold text-[#F5F5F5]">
                      {b.category}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-bold ${isOver ? "text-rose-400" : isWarning ? "text-amber-400" : "text-[#8F8A84]"}`}
                  >
                    {percent}%
                  </span>
                </div>

                {/* Over Budget Alert */}
                {isOver && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-[11px] font-medium text-rose-400">
                    <AlertTriangle size={14} />
                    <span>
                      Exceeded budget limit by ₦
                      {(b.spent - b.limit).toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Amount Row */}
                <div className="mt-4 flex items-baseline justify-between text-xs">
                  <span className="text-[#8F8A84]">
                    Spent:{" "}
                    <strong className="text-[#F5F5F5]">
                      ₦{b.spent.toLocaleString()}
                    </strong>
                  </span>
                  <span className="text-[#8F8A84]">
                    Limit: ₦{b.limit.toLocaleString()}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full transition-all ${isOver ? "bg-rose-500" : isWarning ? "bg-amber-500" : b.color}`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 border-t border-white/[0.06] pt-3 text-right text-[11px] text-[#8F8A84]">
                {isOver ? (
                  <span className="text-rose-400">Action recommended</span>
                ) : (
                  <span>
                    ₦{(b.limit - b.spent).toLocaleString()} remaining capacity
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
