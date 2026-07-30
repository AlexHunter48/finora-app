import { useState, useMemo } from "react";
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

import { useTransactions } from "../context/TransactionsContext";

const CATEGORY_THEMES = {
  "Subscriptions & Recurring": {
    icon: CreditCard,
    color: "bg-[#C9733D]",
    badgeBg: "bg-[#C9733D]/10 border-[#C9733D]/20 text-[#C9733D]",
  },
  "Development & SaaS": {
    icon: Code2,
    color: "bg-purple-500",
    badgeBg: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  },
  "Utilities & Power": {
    icon: Zap,
    color: "bg-amber-500",
    badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  },
  "Food & Dining": {
    icon: Utensils,
    color: "bg-emerald-500",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  "Shopping & Lifestyle": {
    icon: ShoppingBag,
    color: "bg-blue-500",
    badgeBg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
  "General / Uncategorized": {
    icon: Wallet,
    color: "bg-gray-500",
    badgeBg: "bg-gray-500/10 border-gray-500/20 text-gray-400",
  },
};

function categorizeByNarration(narration = "") {
  const n = narration.toLowerCase();
  if (
    n.includes("netflix") ||
    n.includes("spotify") ||
    n.includes("apple") ||
    n.includes("youtube") ||
    n.includes("showmax") ||
    n.includes("dstv") ||
    n.includes("chatgpt") ||
    n.includes("openai") ||
    n.includes("github") ||
    n.includes("adobe") ||
    n.includes("icloud") ||
    n.includes("recurring")
  )
    return "Subscriptions & Recurring";
  if (
    n.includes("vercel") ||
    n.includes("aws") ||
    n.includes("digital ocean") ||
    n.includes("heroku") ||
    n.includes("render") ||
    n.includes("railway") ||
    n.includes("notion") ||
    n.includes("slack") ||
    n.includes("zoom")
  )
    return "Development & SaaS";
  if (
    n.includes("ekedc") ||
    n.includes("ibedc") ||
    n.includes("phedc") ||
    n.includes("electric") ||
    n.includes("nepa") ||
    n.includes("phcn") ||
    n.includes("water") ||
    n.includes("gas") ||
    n.includes("airtime") ||
    n.includes("mtn") ||
    n.includes("glo") ||
    n.includes("airtel") ||
    n.includes("9mobile")
  )
    return "Utilities & Power";
  if (
    n.includes("chicken") ||
    n.includes("food") ||
    n.includes("restaurant") ||
    n.includes("cafe") ||
    n.includes("kitchen") ||
    n.includes("eat") ||
    n.includes("domino") ||
    n.includes("kfc") ||
    n.includes("pizza") ||
    n.includes("uber eat") ||
    n.includes("jumia food")
  )
    return "Food & Dining";
  if (
    n.includes("jumia") ||
    n.includes("konga") ||
    n.includes("slot") ||
    n.includes("amazon") ||
    n.includes("aliexpress") ||
    n.includes("shop") ||
    n.includes("store") ||
    n.includes("mall") ||
    n.includes("market")
  )
    return "Shopping & Lifestyle";
  return "General / Uncategorized";
}

export default function Spending() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("this_month");
  const { transactions = [], monthlyBudget = 300000 } = useTransactions();

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const debitsOnly = transactions.filter((tx) => tx.type === "debit");

    return debitsOnly.filter((tx) => {
      const rawDate = tx.date || tx.createdAt;
      if (!rawDate) return true;
      const txDate = new Date(rawDate);
      if (isNaN(txDate.getTime())) return true;

      const txYear = txDate.getFullYear();
      const txMonth = txDate.getMonth();

      if (timeframe === "this_month") {
        return txYear === currentYear && txMonth === currentMonth;
      }
      if (timeframe === "last_month") {
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear =
          currentMonth === 0 ? currentYear - 1 : currentYear;
        return txYear === lastMonthYear && txMonth === lastMonth;
      }
      if (timeframe === "year") {
        return txYear === currentYear;
      }
      return true;
    });
  }, [transactions, timeframe]);

  const totalSpent = useMemo(() => {
    return filteredTransactions.reduce(
      (sum, item) => sum + (Number(item.amount) || 0) / 100,
      0,
    );
  }, [filteredTransactions]);

  const categoryData = useMemo(() => {
    if (!totalSpent) return [];

    const grouped = filteredTransactions.reduce((acc, item) => {
      const cat = item.category || categorizeByNarration(item.narration);
      const amountInNaira = (Number(item.amount) || 0) / 100;
      acc[cat] = (acc[cat] || 0) + amountInNaira;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([name, amount]) => {
        const percentage = Math.round((amount / totalSpent) * 100);
        const theme =
          CATEGORY_THEMES[name] || CATEGORY_THEMES["General / Uncategorized"];
        return { name, amount, percentage, ...theme };
      })
      .sort((a, b) => b.amount - a.amount);
  }, [filteredTransactions, totalSpent]);

  const topCategory = categoryData[0] || { name: "N/A", percentage: 0 };
  const daysInPeriod = timeframe === "year" ? 365 : 31;
  const dailyBurnRate =
    totalSpent > 0 ? Math.round(totalSpent / daysInPeriod) : 0;
  const budgetRemaining = monthlyBudget - totalSpent;

  const weeklyTrend = useMemo(() => {
    const weeks = [
      { week: "Week 1", amount: 0, weekNum: 1 },
      { week: "Week 2", amount: 0, weekNum: 2 },
      { week: "Week 3", amount: 0, weekNum: 3 },
      { week: "Week 4", amount: 0, weekNum: 4 },
    ];

    filteredTransactions.forEach((tx) => {
      const rawDate = tx.date || tx.createdAt;
      let weekIndex = 0;
      if (rawDate) {
        const dayOfMonth = new Date(rawDate).getDate();
        weekIndex = Math.min(Math.floor((dayOfMonth - 1) / 7), 3);
      }
      weeks[weekIndex].amount += (Number(tx.amount) || 0) / 100;
    });

    const maxAmount = Math.max(...weeks.map((w) => w.amount), 1);

    return weeks.map((w) => ({
      ...w,
      formattedAmount: `₦${Math.round(w.amount).toLocaleString()}`,
      height: `${Math.round((w.amount / maxAmount) * 100)}%`,
      active: w.weekNum === 4,
    }));
  }, [filteredTransactions]);

  const peakWeek = useMemo(() => {
    if (!weeklyTrend.length) return "Week 1";
    return [...weeklyTrend].sort((a, b) => b.amount - a.amount)[0].week;
  }, [weeklyTrend]);

  return (
    <div className="min-h-screen bg-[#0F0E0D] px-4 py-6 pb-28 text-[#F5F5F5] sm:px-8 lg:px-10 lg:pb-10">
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

        <div className="flex items-center gap-1.5 self-start rounded-xl border border-white/[0.08] bg-[#141311] p-1.5 sm:self-auto">
          {[
            { id: "this_month", label: "This Month" },
            { id: "last_month", label: "Last Month" },
            { id: "year", label: "2026" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeframe(tab.id)}
              className={`cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
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

      <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Total Spent</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#C9733D]/20 bg-[#C9733D]/10 text-[#C9733D]">
              <Wallet size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦{Math.round(totalSpent).toLocaleString()}
          </p>
          <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-emerald-400">
            <TrendingDown size={12} />
            <span>8% lower than last month</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Daily Burn Rate</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <Calendar size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦{dailyBurnRate.toLocaleString()}
          </p>
          <p className="mt-1 text-[11px] text-[#8F8A84]">
            Based on {daysInPeriod} days
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Top Category</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#C9733D]/20 bg-[#C9733D]/10 text-[#C9733D]">
              <PieChart size={16} />
            </div>
          </div>
          <p className="mt-3 truncate text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            {topCategory.name.split(" ")[0]}
          </p>
          <p className="mt-1 text-[11px] text-[#8F8A84]">
            {topCategory.percentage}% of total outflow
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Monthly Budget</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <TrendingUp size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦
            {budgetRemaining > 0
              ? Math.round(budgetRemaining).toLocaleString()
              : 0}
          </p>
          <p
            className={`mt-1 text-[11px] font-medium ${budgetRemaining >= 0 ? "text-emerald-400" : "text-red-400"}`}
          >
            {budgetRemaining >= 0 ? "Remaining (On Track)" : "Over Budget"}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
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

            <div className="mt-10 flex h-48 items-end justify-between gap-3 px-2 sm:gap-6">
              {weeklyTrend.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div className="absolute -top-8 rounded-md border border-white/[0.1] bg-[#1D1C1A] px-2 py-1 text-[10px] font-semibold text-[#F5F5F5] opacity-0 transition-opacity group-hover:opacity-100">
                    {item.formattedAmount}
                  </div>
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
              Peak spending occurred in <strong>{peakWeek}</strong>
            </span>
            <button className="flex items-center gap-1 font-medium text-[#C9733D] hover:underline">
              <span>View details</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-5 shadow-lg lg:col-span-5">
          <div>
            <h2 className="text-base font-semibold text-[#F5F5F5]">
              Category Breakdown
            </h2>
            <p className="text-xs text-[#8F8A84]">Distribution of expenses</p>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            {categoryData.length === 0 ? (
              <p className="py-8 text-center text-xs text-[#8F8A84]">
                No spending recorded for this timeframe.
              </p>
            ) : (
              categoryData.map((cat, idx) => {
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
                          ₦{Math.round(cat.amount).toLocaleString()}
                        </span>
                        <span className="ml-1.5 text-[11px] text-[#8F8A84]">
                          ({cat.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${cat.color}`}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
