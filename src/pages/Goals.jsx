import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trophy,
  Laptop,
  ShieldCheck,
  Plane,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const initialGoals = [
  {
    id: "g1",
    title: "Emergency Fund",
    target: 1000000,
    saved: 650000,
    category: "Safety Net",
    dueDate: "Dec 2026",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "g2",
    title: "M3 Macbook Pro Upgrade",
    target: 1800000,
    saved: 1200000,
    category: "Work Tools",
    dueDate: "Oct 2026",
    icon: Laptop,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    id: "g3",
    title: "End of Year Retreat",
    target: 500000,
    saved: 150000,
    category: "Travel",
    dueDate: "Nov 2026",
    icon: Plane,
    color: "text-[#C9733D]",
    bg: "bg-[#C9733D]/10 border-[#C9733D]/20",
  },
];

export default function Goals() {
  const navigate = useNavigate();

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
              Savings Targets
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
              Financial Goals
            </h1>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9733D] to-[#D87F46] px-5 py-3 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(201,115,61,0.25)]">
          <Plus size={16} />
          <span>Create New Goal</span>
        </button>
      </div>

      {/* Goals List */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {initialGoals.map((goal) => {
          const Icon = goal.icon;
          const percent = Math.round((goal.saved / goal.target) * 100);

          return (
            <div
              key={goal.id}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141311] p-6 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border ${goal.bg}`}
                  >
                    <Icon className={`h-6 w-6 ${goal.color}`} />
                  </div>
                  <span className="rounded-full border border-white/[0.08] bg-[#1D1C1A] px-3 py-1 text-[11px] font-medium text-[#8F8A84]">
                    Target: {goal.dueDate}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#F5F5F5]">
                  {goal.title}
                </h3>
                <p className="text-xs text-[#8F8A84]">{goal.category}</p>

                {/* Progress Stats */}
                <div className="mt-6 flex items-baseline justify-between">
                  <div>
                    <p className="text-xs text-[#8F8A84]">Saved so far</p>
                    <p className="text-xl font-bold text-[#F5F5F5]">
                      ₦{goal.saved.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#8F8A84]">Target</p>
                    <p className="text-xs font-semibold text-[#8F8A84]">
                      ₦{goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Meter Bar */}
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#C9733D] to-[#D87F46]"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <span className="text-xs font-semibold text-emerald-400">
                  {percent}% Completed
                </span>
                <button className="flex items-center gap-1 text-xs font-medium text-[#C9733D] hover:underline">
                  <span>Add Funds</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
