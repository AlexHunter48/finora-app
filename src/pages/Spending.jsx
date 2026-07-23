import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  PieChart,
  Calendar,
  CreditCard,
  Zap,
  ShoppingBag,
  Utensils,
  Code2,
  Wallet,
  ArrowUpRight,
  Filter,
} from "lucide-react";

// Category spending breakdown with custom progress bars and icons
const categoryData = [
  {
    name: "Subscriptions & Recurring",
    amount: "₦103,000",
    percentage: 42,
    icon: CreditCard,
    color: "bg-[#C9733D]",
    badgeBg: "bg-[#C9733D]/10 border-[#C9733D]/20 text-[#C9733D]",
  },
  {
    name: "Development & SaaS",
    amount: "₦61,000",
    percentage: 25,
    icon: Code2,
    color: "bg-purple-500",
    badgeBg: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  },
  {
    name: "Utilities & Power",
    amount: "₦38,000",
    percentage: 15,
    icon: Zap,
    color: "bg-amber-500",
    badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  },
  {
    name: "Food & Dining",
    amount: "₦28,000",
    percentage: 11,
    icon: Utensils,
    color: "bg-emerald-500",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    name: "Shopping & Lifestyle",
    amount: "₦15,000",
    percentage: 7,
    icon: ShoppingBag,
    color: "bg-blue-500",
    badgeBg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
];

// Mock weekly bar chart height distribution
const weeklyTrend = [
  { week: "Week 1", amount: "₦52,000", height: "55%", active: false },
  { week: "Week 2", amount: "₦88,000", height: "85%", active: false },
  { week: "Week 3", amount: "₦34,000", height: "40%", active: false },
  { week: "Week 4", amount: "₦71,000", height: "70%", active: true }, // Current week
];

export default function Spending() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("this_month");

  return (
    <div className="min-h-screen bg-[#0F0E0D] px-4 py-6 pb-28 text-[#F5F5F5] sm:px-8 lg:px-10 lg:pb-10">
      {/* 1. Header with Back Button & Time Range Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/[0.08] bg-[#141311] text-[#8F8A84] transition-all hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-[#F5F5F5] active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-xs font-medium tracking-wider text-[#8F8A84] uppercase">
              Financial Analytics
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
              Spending Insights
            </h1>
          </div>
        </div>

        {/* Timeframe Filter Tabs */}
        <div className="flex items-center gap-1.5 self-start rounded-xl border border-white/[0.08] bg-[#141311] p-1.5 sm:self-auto">
          {[
            { id: "this_month", label: "This Month" },
            { id: "last_month", label: "Last Month" },
            { id: "year", label: "2026" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeframe(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                timeframe === tab.id
                  ? "bg-[#C9733D] text-white shadow-md"
                  : "text-[#8F8A84] hover:text-[#F5F5F5]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Overview Metrics Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Outflow */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Total Spent</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#C9733D]/20 bg-[#C9733D]/10 text-[#C9733D]">
              <Wallet size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦245,000
          </p>
          <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-emerald-400">
            <TrendingDown size={12} />
            <span>8% lower than last month</span>
          </div>
        </div>

        {/* Daily Average */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Daily Burn Rate</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <Calendar size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦7,903
          </p>
          <p className="mt-1 text-[11px] text-[#8F8A84]">Based on 31 days</p>
        </div>

        {/* Largest Category */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Top Category</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#C9733D]/20 bg-[#C9733D]/10 text-[#C9733D]">
              <PieChart size={16} />
            </div>
          </div>
          <p className="mt-3 truncate text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            Subscriptions
          </p>
          <p className="mt-1 text-[11px] text-[#8F8A84]">
            42% of total outflow
          </p>
        </div>

        {/* Budget Status */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Monthly Budget</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <TrendingUp size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦55,000
          </p>
          <p className="mt-1 text-[11px] font-medium text-emerald-400">
            Remaining (On Track)
          </p>
        </div>
      </div>

      {/* 3. Main Analytics Layout: Visual Chart + Category Progress */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Weekly Spending Velocity Visual (7 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141311] p-5 shadow-lg lg:col-span-7">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#F5F5F5]">
                  Weekly Outflow Trend
                </h2>
                <p className="text-xs text-[#8F8A84]">
                  Spending velocity across weeks
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#1D1C1A] px-2.5 py-1 text-[11px] font-medium text-[#8F8A84]">
                <Filter size={12} /> Weekly
              </span>
            </div>

            {/* Custom Bar Graph Visual */}
            <div className="mt-10 flex h-48 items-end justify-between gap-3 px-2 sm:gap-6">
              {weeklyTrend.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  {/* Hover Tooltip */}
                  <div className="absolute -top-8 rounded-md border border-white/[0.1] bg-[#1D1C1A] px-2 py-1 text-[10px] font-semibold text-[#F5F5F5] opacity-0 transition-opacity group-hover:opacity-100">
                    {item.amount}
                  </div>

                  {/* Bar Pill */}
                  <div className="flex h-full w-full max-w-[48px] items-end rounded-t-xl bg-white/[0.05] p-1">
                    <div
                      style={{ height: item.height }}
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        item.active
                          ? "bg-gradient-to-t from-[#C9733D] to-[#D87F46] shadow-[0_0_15px_rgba(201,115,61,0.3)]"
                          : "bg-[#8F8A84]/30 group-hover:bg-[#8F8A84]/50"
                      }`}
                    />
                  </div>

                  {/* Week Label */}
                  <span
                    className={`text-[11px] font-medium ${item.active ? "text-[#C9733D]" : "text-[#8F8A84]"}`}
                  >
                    {item.week}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs text-[#8F8A84]">
            <span>
              Peak spending occurred in <strong>Week 2</strong>
            </span>
            <button className="flex items-center gap-1 font-medium text-[#C9733D] hover:underline">
              <span>View details</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Category Breakdown with Custom Progress Bars (5 cols) */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-5 shadow-lg lg:col-span-5">
          <div>
            <h2 className="text-base font-semibold text-[#F5F5F5]">
              Category Breakdown
            </h2>
            <p className="text-xs text-[#8F8A84]">Distribution of expenses</p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {categoryData.map((cat, idx) => {
              const Icon = cat.icon;

              return (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border ${cat.badgeBg}`}
                      >
                        <Icon size={14} />
                      </div>
                      <span className="font-medium text-[#F5F5F5]">
                        {cat.name}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-semibold text-[#F5F5F5]">
                        {cat.amount}
                      </span>
                      <span className="ml-1.5 text-[11px] text-[#8F8A84]">
                        ({cat.percentage}%)
                      </span>
                    </div>
                  </div>

                  {/* Custom Progress Bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${cat.color}`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
