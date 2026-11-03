import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  CreditCard,
  Calendar,
  TrendingUp,
  Zap,
  Search,
  Globe,
  MoreHorizontal,
  CheckCircle2,
  Tv,
  Music,
  Cloud,
  Code2,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { useMockDetection } from "../features/subscription/useMockDetection";
import { useDeleteSubscription } from "../features/subscription/useDeleteSubscription";
import useSubscriptions from "../features/subscription/useGetSubscriptions";

const categoryConfig = {
  Entertainment: {
    label: "Entertainment",
    icon: Tv,
    color: "text-[#E50914]",
    bg: "bg-[#E50914]/10 border-[#E50914]/20",
  },
  Productivity: {
    label: "Productivity & AI",
    icon: Zap,
    color: "text-[#C9733D]",
    bg: "bg-[#C9733D]/10 border-[#C9733D]/20",
  },
  Music: {
    label: "Music & Audio",
    icon: Music,
    color: "text-[#1DB954]",
    bg: "bg-[#1DB954]/10 border-[#1DB954]/20",
  },
  Health: {
    label: "Health & Fitness",
    icon: Zap,
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10 border-[#3B82F6]/20",
  },
  Education: {
    label: "Education",
    icon: Cloud,
    color: "text-[#A855F7]",
    bg: "bg-[#A855F7]/10 border-[#A855F7]/20",
  },
  Other: {
    label: "General / Other",
    icon: Code2,
    color: "text-[#8F8A84]",
    bg: "bg-[#8F8A84]/10 border-[#8F8A84]/20",
  },
};

export default function Subscriptions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { data: subscriptions = [], isLoading, isError } = useSubscriptions();
  const { mutate: runMockSync, isPending: isSyncing } = useMockDetection();
  const { mutate: deleteSub } = useDeleteSubscription();

  const calculateDaysLeft = (dueDateStr) => {
    if (!dueDateStr) return 0;
    const now = new Date();
    const target = new Date(dueDateStr);
    const diffTime = target.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const enrichedSubscriptions = subscriptions.map((sub) => {
    const daysLeft = calculateDaysLeft(sub.dueDate);
    const formattedDate = new Date(sub.dueDate).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
    return {
      ...sub,
      daysLeft,
      formattedDate,
      isFX: sub.currency === "USD",
    };
  });

  const activeSubscriptions = enrichedSubscriptions.filter(
    (sub) => sub.status === "active",
  );

  const monthlyTotalVal = activeSubscriptions.reduce(
    (sum, sub) => sum + sub.amount,
    0,
  );

  const dueThisWeekSubs = activeSubscriptions.filter(
    (sub) => sub.daysLeft <= 7,
  );

  const dueThisWeekVal = dueThisWeekSubs.reduce(
    (sum, sub) => sum + sub.amount,
    0,
  );

  const highestExpenseSub = [...activeSubscriptions].sort(
    (a, b) => b.amount - a.amount,
  )[0] || { name: "None", amount: 0 };

  const yearlyForecastVal = monthlyTotalVal * 12;

  const filteredSubscriptions = enrichedSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === "due") return matchesSearch && sub.daysLeft <= 7;
    if (selectedFilter === "fx") return matchesSearch && sub.isFX;
    return matchesSearch;
  });

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
              Recurring Expenses
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
              Subscriptions
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => runMockSync()}
            disabled={isSyncing}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-[#141311] px-4 py-3 text-xs font-medium text-[#8F8A84] transition hover:border-white/[0.2] hover:text-white disabled:opacity-50"
          >
            <Zap size={14} className="text-[#C9733D]" />
            <span>{isSyncing ? "Scanning..." : "Sync Bank Feeds"}</span>
          </button>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9733D] to-[#D87F46] px-5 py-3 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(201,115,61,0.25)] transition hover:shadow-[0_6px_25px_rgba(201,115,61,0.4)] active:scale-[0.98]">
            <Plus size={16} />
            <span>Add Subscription</span>
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Monthly Total</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#C9733D]/20 bg-[#C9733D]/10 text-[#C9733D]">
              <CreditCard size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦{monthlyTotalVal.toLocaleString("en-NG")}
          </p>
          <p className="mt-1 text-[11px] text-[#8F8A84]">
            {activeSubscriptions.length} active services
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Due This Week</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
              <Calendar size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦{dueThisWeekVal.toLocaleString("en-NG")}
          </p>
          <p className="mt-1 text-[11px] font-medium text-amber-500">
            {dueThisWeekSubs.length} auto-debits upcoming
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Highest Expense</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
              <TrendingUp size={16} />
            </div>
          </div>
          <p className="mt-3 truncate text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            {highestExpenseSub.name}
          </p>
          <p className="mt-1 text-[11px] text-[#8F8A84]">
            ₦{highestExpenseSub.amount.toLocaleString("en-NG")} / month
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Yearly Forecast</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-[#45C27A]">
              <Zap size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦{yearlyForecastVal.toLocaleString("en-NG")}
          </p>
          <p className="mt-1 text-[11px] text-[#8F8A84]">
            Projected annual spend
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            size={16}
            className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#8F8A84]"
          />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-[#141311] py-2.5 pr-4 pl-10 text-xs text-[#F5F5F5] placeholder-[#8F8A84] transition outline-none focus:border-[#C9733D]/50 focus:ring-1 focus:ring-[#C9733D]/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: `All (${enrichedSubscriptions.length})` },
            { id: "due", label: `Due Soon (${dueThisWeekSubs.length})` },
            { id: "fx", label: "USD / Foreign FX" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-medium transition ${
                selectedFilter === tab.id
                  ? "border border-[#C9733D]/40 bg-[#C9733D]/15 text-[#C9733D]"
                  : "border border-white/[0.06] bg-[#141311] text-[#8F8A84] hover:text-[#F5F5F5]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-12 text-center text-xs text-[#8F8A84]">
          Fetching active subscriptions...
        </div>
      ) : isError ? (
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-red-400">
          <AlertCircle size={16} /> Failed to load subscriptions from server.
        </div>
      ) : filteredSubscriptions.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-white/[0.08] p-8 text-center">
          <p className="text-sm text-[#8F8A84]">No subscriptions found.</p>
          <button
            onClick={() => runMockSync()}
            className="mt-3 text-xs text-[#C9733D] hover:underline"
          >
            Click here to run bank detection sync
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSubscriptions.map((sub) => {
            const config = categoryConfig[sub.category] || categoryConfig.Other;
            const CategoryIcon = config.icon;

            return (
              <div
                key={sub._id || sub.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141311] p-5 transition-all duration-200 hover:border-[#C9733D]/40"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border ${config.bg}`}
                      >
                        <CategoryIcon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[#F5F5F5]">
                            {sub.name}
                          </h3>
                          {sub.isFX && (
                            <span
                              className="inline-flex items-center gap-1 rounded-md border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium text-blue-400"
                              title="Billed in foreign currency"
                            >
                              <Globe size={10} /> USD
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#8F8A84]">
                          {sub.category} • {sub.frequency}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteSub(sub._id || sub.id)}
                      title="Remove subscription"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[#8F8A84] transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="mt-5 flex items-baseline justify-between border-t border-white/[0.06] pt-4">
                    <span className="text-xs text-[#8F8A84]">
                      Billing Amount
                    </span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#F5F5F5]">
                        ₦{sub.amount.toLocaleString("en-NG")}
                      </span>
                      <span className="text-xs text-[#8F8A84]"> / mo</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#8F8A84]">
                    <Calendar size={13} />
                    <span>
                      {sub.daysLeft <= 7 ? (
                        <strong className="font-semibold text-amber-400">
                          Renews in {sub.daysLeft}d ({sub.formattedDate})
                        </strong>
                      ) : (
                        <span>
                          Renews in{" "}
                          <strong className="font-semibold text-[#F5F5F5]">
                            {sub.daysLeft}d ({sub.formattedDate})
                          </strong>
                        </span>
                      )}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#45C27A]">
                    <CheckCircle2 size={12} /> Active
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
