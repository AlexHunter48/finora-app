import React, { useMemo } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
  Utensils,
  Wallet,
  ChevronRight,
  CreditCard,
  ShoppingBag,
} from "lucide-react";
import { useTransactions } from "../context/TransactionsContext";

// Custom Brand Logos
const NetflixLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#E50914]">
    <path d="M5.398 0v24h4.131l.036-12.871 4.965 12.871h4.072V0h-4.072l-.036 12.871L9.529 0H5.398z" />
  </svg>
);

const SpotifyLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#1DB954]">
    <path d="M12 0C5.376 0 0 5.377 0 12c0 6.623 5.377 12 12 12 6.623 0 12-5.377 12-12 0-6.623-5.377-12-12-12zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.019zm1.441-3.24c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.242 1.26zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.36z" />
  </svg>
);

const UberLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#F5F5F5]">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
  </svg>
);

// Helper to format dates into human-readable strings ("Today, 9:42 AM", "Yesterday", "July 24")
const formatTxDate = (rawDate) => {
  if (!rawDate) return "Recent";
  const date = new Date(rawDate);
  if (isNaN(date.getTime())) return "Recent";

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return `Today, ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Helper to select an icon and theme based on category/narration
const getTxStyle = (title = "", category = "", isIncome = false) => {
  const query = `${title} ${category}`.toLowerCase();

  if (query.includes("netflix"))
    return {
      icon: NetflixLogo,
      badgeBg: "bg-[#E50914]/10 border-[#E50914]/20",
      color: "",
    };
  if (query.includes("spotify"))
    return {
      icon: SpotifyLogo,
      badgeBg: "bg-[#1DB954]/10 border-[#1DB954]/20",
      color: "",
    };
  if (query.includes("uber") || query.includes("transport"))
    return {
      icon: UberLogo,
      badgeBg: "bg-white/10 border-white/20",
      color: "",
    };
  if (
    query.includes("food") ||
    query.includes("dining") ||
    query.includes("chicken")
  )
    return {
      icon: Utensils,
      badgeBg: "bg-[#E28B51]/10 border-[#E28B51]/20",
      color: "text-[#E28B51]",
    };
  if (isIncome || query.includes("salary") || query.includes("deposit"))
    return {
      icon: Wallet,
      badgeBg: "bg-[#45C27A]/10 border-[#45C27A]/20",
      color: "text-[#45C27A]",
    };
  if (query.includes("shop") || query.includes("store"))
    return {
      icon: ShoppingBag,
      badgeBg: "bg-[#6E6962]/10 border-[#6E6962]/20",
      color: "text-[#A8A39B]",
    };

  return {
    icon: CreditCard,
    badgeBg: "bg-[#C9733D]/10 border-[#C9733D]/20",
    color: "text-[#C9733D]",
  };
};

// Clean up raw category strings (e.g. "food_and_drink" -> "Food And Drink")
const formatCategoryName = (rawCat) => {
  if (typeof rawCat !== "string" || !rawCat.trim()) return "General";
  return rawCat
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function RecentTransactions() {
  const { transactions = [] } = useTransactions();

  // Process, sort (newest first), and select top 5 transactions
  const recentList = useMemo(() => {
    return [...transactions]
      .sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt || a.created_at);
        const dateB = new Date(b.date || b.createdAt || b.created_at);
        return dateB - dateA;
      })
      .slice(0, 5)
      .map((tx) => {
        const isIncome = tx.type?.toLowerCase() === "credit";
        const rawAmount = Math.abs(Number(tx.amount) || 0) / 100; // Mono kobo -> NGN

        const rawCat =
          tx.category?.name || tx.category || tx.category_name || "General";
        const category = formatCategoryName(rawCat);
        const title =
          tx.narration || tx.name || tx.description || "Transaction";

        const { icon, badgeBg, color } = getTxStyle(title, category, isIncome);

        return {
          id: tx.id || tx._id || Math.random().toString(),
          title,
          category,
          amountFormatted: `${isIncome ? "+" : "-"}₦${rawAmount.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          )}`,
          dateFormatted: formatTxDate(tx.date || tx.createdAt || tx.created_at),
          isIncome,
          IconComponent: icon,
          badgeBg,
          iconColor: color,
        };
      });
  }, [transactions]);

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#141311] p-5 text-[#F5F5F5] shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#8F8A84]">Recent Activity</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[#F5F5F5]">
            Transactions
          </h3>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#1D1C1A] text-[#A8A39B] transition hover:border-[#C9733D]/30 hover:text-[#C9733D]">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {recentList.length > 0 ? (
          recentList.map((item) => {
            const { IconComponent } = item;

            return (
              <div
                key={item.id}
                className="group flex items-center justify-between rounded-xl border border-white/[0.04] bg-[#1A1917]/70 p-3.5 transition-all duration-200 hover:border-[#C9733D]/40 hover:bg-[#1A1917] active:scale-[0.99]"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="relative shrink-0">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm ${item.badgeBg}`}
                    >
                      <IconComponent
                        className={`h-4 w-4 ${item.iconColor || ""}`}
                      />
                    </div>

                    <span
                      className={`absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#141311] text-[9px] ${
                        item.isIncome
                          ? "bg-[#45C27A] text-[#141311]"
                          : "bg-[#2A201B] text-[#C9733D]"
                      }`}
                    >
                      {item.isIncome ? (
                        <ArrowDownLeft size={10} strokeWidth={3} />
                      ) : (
                        <ArrowUpRight size={10} strokeWidth={3} />
                      )}
                    </span>
                  </div>

                  <div className="min-w-0 text-left">
                    <h4 className="truncate text-sm font-semibold text-[#F5F5F5]">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 truncate text-[12px] text-[#8F8A84]">
                      {item.category} • {item.dateFormatted}
                    </p>
                  </div>
                </div>

                <div className="ml-3 shrink-0 text-right">
                  <span
                    className={`text-sm font-semibold tracking-tight whitespace-nowrap ${
                      item.isIncome ? "text-[#45C27A]" : "text-[#F5F5F5]"
                    }`}
                  >
                    {item.amountFormatted}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="py-8 text-center text-xs text-[#8F8A84]">
            No recent transactions available.
          </p>
        )}
      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#1D1C1A] py-3 text-xs font-semibold text-[#C9733D] transition hover:border-[#C9733D]/40 hover:bg-[#23211E]">
        <span>View All Transactions</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
