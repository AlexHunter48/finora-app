import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Search,
  CreditCard,
  Calendar,
  MoreHorizontal,
  Tv,
  Code2,
  Cloud,
  Music,
  Zap,
  TrendingUp,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { useTransactions } from "../context/TransactionsContext";

const categoryConfig = {
  entertainment: {
    label: "Entertainment",
    icon: Tv,
    color: "text-[#E50914]",
    bg: "bg-[#E50914]/10 border-[#E50914]/20",
  },
  productivity: {
    label: "Productivity & AI",
    icon: Zap,
    color: "text-[#C9733D]",
    bg: "bg-[#C9733D]/10 border-[#C9733D]/20",
  },
  music: {
    label: "Music & Audio",
    icon: Music,
    color: "text-[#1DB954]",
    bg: "bg-[#1DB954]/10 border-[#1DB954]/20",
  },
  cloud: {
    label: "Cloud & Storage",
    icon: Cloud,
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10 border-[#3B82F6]/20",
  },
  developer: {
    label: "Developer Tools",
    icon: Code2,
    color: "text-[#A855F7]",
    bg: "bg-[#A855F7]/10 border-[#A855F7]/20",
  },
};

const fxMerchants = [
  "chatgpt",
  "openai",
  "github",
  "copilot",
  "adobe",
  "figma",
  "aws",
  "vercel",
  "netlify",
  "midjourney",
  "cursor",
];

const formatMerchantName = (rawText) => {
  if (!rawText) return "Subscription";
  const str = rawText.toLowerCase();

  if (str.includes("netflix")) return "Netflix";
  if (str.includes("spotify")) return "Spotify";
  if (str.includes("chatgpt") || str.includes("openai")) return "ChatGPT Plus";
  if (str.includes("icloud") || (str.includes("apple") && str.includes("bill")))
    return "iCloud+";
  if (str.includes("adobe")) return "Adobe CC";
  if (str.includes("github") || str.includes("copilot"))
    return "GitHub Copilot";
  if (str.includes("youtube")) return "YouTube Premium";
  if (str.includes("dstv")) return "DStv";
  if (str.includes("showmax")) return "Showmax";
  if (str.includes("prime") || str.includes("amazon")) return "Amazon Prime";

  return (
    rawText
      .split("/")[0]
      .replace(/POS|WEB|FLW|PAYSTACK/gi, "")
      .trim() || rawText
  );
};

const calculateRenewalStatus = (rawDate) => {
  const now = new Date();
  let target = rawDate ? new Date(rawDate) : new Date();

  if (isNaN(target.getTime()) || target < now) {
    const billingDay = target.getDate() || 15;
    target = new Date(now.getFullYear(), now.getMonth(), billingDay);
    if (target < now) {
      target.setMonth(target.getMonth() + 1);
    }
  }

  const diffTime = target.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const renewalDate = target.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  return { daysLeft, renewalDate };
};

const normalizeMonoSubscription = (sub, idx) => {
  const rawName =
    sub.name ||
    sub.title ||
    sub.merchant ||
    sub.narration ||
    sub.description ||
    "Subscription";

  const cleanName = formatMerchantName(rawName);
  const lowerText = `${rawName} ${cleanName}`.toLowerCase();

  let category = sub.category ? String(sub.category).toLowerCase() : "";
  if (!categoryConfig[category]) {
    if (
      lowerText.includes("netflix") ||
      lowerText.includes("dstv") ||
      lowerText.includes("prime") ||
      lowerText.includes("youtube") ||
      lowerText.includes("showmax")
    ) {
      category = "entertainment";
    } else if (
      lowerText.includes("spotify") ||
      lowerText.includes("music") ||
      lowerText.includes("apple music")
    ) {
      category = "music";
    } else if (
      lowerText.includes("cloud") ||
      lowerText.includes("icloud") ||
      lowerText.includes("drive") ||
      lowerText.includes("dropbox")
    ) {
      category = "cloud";
    } else if (
      lowerText.includes("github") ||
      lowerText.includes("copilot") ||
      lowerText.includes("vercel") ||
      lowerText.includes("aws")
    ) {
      category = "developer";
    } else {
      category = "productivity";
    }
  }

  let rawAmount = 0;
  if (typeof sub.amount === "number") {
    rawAmount = Math.abs(sub.amount);
  } else if (typeof sub.amount === "string") {
    const cleaned = sub.amount.replace(/,/g, "").replace(/[^0-9.]/g, "");
    rawAmount = parseFloat(cleaned) || 0;
  }

  const isKoboUnit =
    sub.isKobo ||
    (typeof sub.amount === "number" &&
      Number.isInteger(sub.amount) &&
      sub.amount >= 100000) ||
    (typeof sub.amount === "string" && !sub.amount.includes("."));

  const numericAmount = isKoboUnit ? rawAmount / 100 : rawAmount;
  const formattedAmount = `₦${numericAmount.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

  const isFX =
    sub.isFX ||
    sub.currency === "USD" ||
    fxMerchants.some((m) => lowerText.includes(m));

  const { daysLeft, renewalDate } = calculateRenewalStatus(
    sub.nextPaymentDate || sub.renewalDate || sub.date || sub.createdAt,
  );

  return {
    id: sub._id || sub.id || String(idx + 1),
    name: cleanName,
    plan:
      sub.plan ||
      sub.description ||
      (isFX ? "Foreign Subscription" : "Standard Plan"),
    category,
    amount: formattedAmount,
    rawAmount: numericAmount,
    cycle: sub.cycle || "monthly",
    renewalDate,
    daysLeft,
    status: sub.status || "active",
    isFX,
  };
};

export default function Subscriptions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const context = useTransactions() || {};
  const {
    subscriptions: monoSubscriptions = [],
    transactions = [],
    monthlyTransactions = [],
  } = context;

  const allContextTransactions = [
    ...monoSubscriptions,
    ...(monthlyTransactions.length > 0 ? monthlyTransactions : transactions),
  ];

  const autoDetectedSubscriptions = allContextTransactions.filter((tx) => {
    if (!tx) return false;
    if (tx.type === "subscription" || tx.isSubscription) return true;

    const fullText = [
      tx.title,
      tx.merchant,
      tx.category,
      tx.narration,
      tx.description,
      tx.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const subKeywords = [
      "subscrip",
      "netflix",
      "spotify",
      "chatgpt",
      "openai",
      "icloud",
      "apple.com/bill",
      "apple",
      "adobe",
      "github",
      "copilot",
      "google",
      "youtube",
      "prime",
      "amazon",
      "dstv",
      "gotv",
      "showmax",
      "canva",
      "figma",
      "cursor",
      "midjourney",
      "vercel",
      "aws",
      "heroku",
      "linkedin",
    ];

    return subKeywords.some((keyword) => fullText.includes(keyword));
  });

  const normalizedSubscriptions = autoDetectedSubscriptions.map(
    normalizeMonoSubscription,
  );

  const activeSubscriptions = normalizedSubscriptions.filter(
    (sub) => sub.status === "active",
  );

  const monthlyTotalVal = activeSubscriptions.reduce(
    (sum, sub) => sum + sub.rawAmount,
    0,
  );

  const dueThisWeekSubs = activeSubscriptions.filter(
    (sub) => sub.daysLeft <= 7,
  );
  const dueThisWeekVal = dueThisWeekSubs.reduce(
    (sum, sub) => sum + sub.rawAmount,
    0,
  );

  const highestExpenseSub = [...activeSubscriptions].sort(
    (a, b) => b.rawAmount - a.rawAmount,
  )[0] || { name: "None", rawAmount: 0 };

  const yearlyForecastVal = monthlyTotalVal * 12;
  const formattedYearlyForecast =
    yearlyForecastVal >= 1000000
      ? `₦${(yearlyForecastVal / 1000000).toFixed(2)}M`
      : `₦${yearlyForecastVal.toLocaleString("en-NG")}`;

  const filteredSubscriptions = normalizedSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.plan.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === "due") return matchesSearch && sub.daysLeft <= 7;
    if (selectedFilter === "fx") return matchesSearch && sub.isFX;
    return matchesSearch;
  });

  const dueSoonCount = normalizedSubscriptions.filter(
    (sub) => sub.daysLeft <= 7,
  ).length;

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

        <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9733D] to-[#D87F46] px-5 py-3 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(201,115,61,0.25)] transition hover:shadow-[0_6px_25px_rgba(201,115,61,0.4)] active:scale-[0.98]">
          <Plus size={16} />
          <span>Add Subscription</span>
        </button>
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
            ₦{highestExpenseSub.rawAmount.toLocaleString("en-NG")} / month
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
            {formattedYearlyForecast}
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
            placeholder="Search subscriptions or plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-[#141311] py-2.5 pr-4 pl-10 text-xs text-[#F5F5F5] placeholder-[#8F8A84] transition outline-none focus:border-[#C9733D]/50 focus:ring-1 focus:ring-[#C9733D]/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: `All (${normalizedSubscriptions.length})` },
            { id: "due", label: `Due Soon (${dueSoonCount})` },
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

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSubscriptions.map((sub) => {
          const config =
            categoryConfig[sub.category] || categoryConfig.productivity;
          const CategoryIcon = config.icon;

          return (
            <div
              key={sub.id}
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
                      <p className="text-xs text-[#8F8A84]">{sub.plan}</p>
                    </div>
                  </div>

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[#8F8A84] transition hover:border-white/[0.08] hover:bg-[#1D1C1A] hover:text-[#F5F5F5]">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className="mt-5 flex items-baseline justify-between border-t border-white/[0.06] pt-4">
                  <span className="text-xs text-[#8F8A84]">Billing Amount</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#F5F5F5]">
                      {sub.amount}
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
                        Renews in {sub.daysLeft}d ({sub.renewalDate})
                      </strong>
                    ) : (
                      <span>
                        Renews in{" "}
                        <strong className="font-semibold text-[#F5F5F5]">
                          {sub.daysLeft}d
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
    </div>
  );
}
