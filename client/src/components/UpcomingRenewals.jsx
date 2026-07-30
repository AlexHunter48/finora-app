import React, { useMemo } from "react";
import { Calendar, ChevronRight, CreditCard } from "lucide-react";
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

const YouTubeLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#FF0000]">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const ChatGPTLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#10A37F]">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.259 23.5a6.0414 6.0414 0 0 0 5.7602-4.1818 5.9847 5.9847 0 0 0 3.9977-2.9 6.0558 6.0558 0 0 0-.735-7.0971z" />
  </svg>
);

// Fallback static list if no subscriptions are found in Mono context
const DEFAULT_SUBSCRIPTIONS = [
  {
    id: "sub-1",
    name: "Netflix",
    plan: "Premium 4K",
    dueTag: "Today",
    isDueToday: true,
    amountFormatted: "₦6,500",
    billingCycle: "Monthly",
    IconComponent: NetflixLogo,
    badgeBg: "bg-[#E50914]/10 border-[#E50914]/20",
  },
  {
    id: "sub-2",
    name: "Spotify",
    plan: "Individual",
    dueTag: "In 3 days",
    isDueToday: false,
    amountFormatted: "₦2,300",
    billingCycle: "Monthly",
    IconComponent: SpotifyLogo,
    badgeBg: "bg-[#1DB954]/10 border-[#1DB954]/20",
  },
  {
    id: "sub-3",
    name: "YouTube",
    plan: "Premium",
    dueTag: "In 8 days",
    isDueToday: false,
    amountFormatted: "₦3,200",
    billingCycle: "Monthly",
    IconComponent: YouTubeLogo,
    badgeBg: "bg-[#FF0000]/10 border-[#FF0000]/20",
  },
  {
    id: "sub-4",
    name: "ChatGPT Plus",
    plan: "Pro Plan",
    dueTag: "In 12 days",
    isDueToday: false,
    amountFormatted: "₦32,000",
    billingCycle: "Monthly",
    IconComponent: ChatGPTLogo,
    badgeBg: "bg-[#10A37F]/10 border-[#10A37F]/20",
  },
];

const getSubscriptionStyle = (title = "") => {
  const query = title.toLowerCase();

  if (query.includes("netflix"))
    return {
      icon: NetflixLogo,
      badgeBg: "bg-[#E50914]/10 border-[#E50914]/20",
      plan: "Premium 4K",
    };
  if (query.includes("spotify"))
    return {
      icon: SpotifyLogo,
      badgeBg: "bg-[#1DB954]/10 border-[#1DB954]/20",
      plan: "Individual",
    };
  if (query.includes("youtube"))
    return {
      icon: YouTubeLogo,
      badgeBg: "bg-[#FF0000]/10 border-[#FF0000]/20",
      plan: "Premium",
    };
  if (query.includes("chatgpt") || query.includes("openai"))
    return {
      icon: ChatGPTLogo,
      badgeBg: "bg-[#10A37F]/10 border-[#10A37F]/20",
      plan: "Pro Plan",
    };

  return {
    icon: CreditCard,
    badgeBg: "bg-[#C9733D]/10 border-[#C9733D]/20",
    plan: "Standard Plan",
  };
};

export default function UpcomingRenewals() {
  const { transactions = [] } = useTransactions();

  // Scan live transactions for recurring subscription items
  const liveSubscriptions = useMemo(() => {
    const detected = [];
    const seenNames = new Set();

    transactions.forEach((tx) => {
      const isDebit = tx.type?.toLowerCase() === "debit";
      if (!isDebit) return;

      const title = tx.narration || tx.name || tx.title || "";
      const lower = title.toLowerCase();
      const rawCat = (tx.category?.name || tx.category || "").toLowerCase();

      const isSub =
        rawCat.includes("sub") ||
        lower.includes("netflix") ||
        lower.includes("spotify") ||
        lower.includes("youtube") ||
        lower.includes("chatgpt") ||
        lower.includes("apple") ||
        lower.includes("dstv");

      if (isSub) {
        // Extract merchant name (e.g., "Netflix" out of "Netflix Subscription")
        let brandName = title;
        if (lower.includes("netflix")) brandName = "Netflix";
        else if (lower.includes("spotify")) brandName = "Spotify";
        else if (lower.includes("youtube")) brandName = "YouTube";
        else if (lower.includes("chatgpt")) brandName = "ChatGPT Plus";

        if (!seenNames.has(brandName)) {
          seenNames.add(brandName);

          const rawAmount = Math.abs(Number(tx.amount) || 0) / 100;
          const { icon, badgeBg, plan } = getSubscriptionStyle(brandName);

          // Calculate next renewal (assuming monthly cycle from last date)
          const lastDate = new Date(
            tx.date || tx.createdAt || tx.created_at || Date.now(),
          );
          const nextDate = new Date(lastDate);
          nextDate.setMonth(nextDate.getMonth() + 1);

          const diffDays = Math.ceil(
            (nextDate - new Date()) / (1000 * 60 * 60 * 24),
          );
          let dueTag = diffDays <= 0 ? "Due Today" : `In ${diffDays} days`;
          const isDueToday = diffDays <= 0;

          detected.push({
            id: tx.id || tx._id || Math.random().toString(),
            name: brandName,
            plan,
            dueTag,
            isDueToday,
            amountFormatted: `₦${rawAmount.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}`,
            billingCycle: "Monthly",
            IconComponent: icon,
            badgeBg,
          });
        }
      }
    });

    return detected;
  }, [transactions]);

  // Use dynamic list if subscriptions were found; otherwise display the full default set
  const displayList =
    liveSubscriptions.length > 0 ? liveSubscriptions : DEFAULT_SUBSCRIPTIONS;

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#141311] p-5 text-[#F5F5F5] shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#8F8A84]">Upcoming Renewals</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[#F5F5F5]">
            Subscriptions
          </h3>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#1D1C1A] text-[#A8A39B] transition hover:border-[#C9733D]/30 hover:text-[#C9733D]">
          <Calendar size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {displayList.map((item) => {
          const { IconComponent } = item;

          return (
            <div
              key={item.id}
              className="group flex items-center justify-between rounded-xl border border-white/[0.04] bg-[#1A1917]/70 p-3.5 transition-all duration-200 hover:border-[#C9733D]/40 hover:bg-[#1A1917] active:scale-[0.99]"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-sm ${item.badgeBg}`}
                >
                  <IconComponent />
                </div>

                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <h4 className="truncate text-sm font-semibold text-[#F5F5F5]">
                      {item.name}
                    </h4>
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                        item.isDueToday
                          ? "border border-[#C9733D]/30 bg-[#C9733D]/10 text-[#C9733D]"
                          : "bg-white/[0.06] text-[#8F8A84]"
                      }`}
                    >
                      {item.dueTag}
                    </span>
                  </div>

                  <p className="mt-0.5 truncate text-[12px] text-[#8F8A84]">
                    {item.plan} •{" "}
                    <span
                      className={
                        item.isDueToday ? "text-[#C9733D]" : "text-[#8F8A84]"
                      }
                    >
                      {item.isDueToday ? "Due Today" : item.dueTag}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="block text-sm font-semibold text-[#F5F5F5]">
                    {item.amountFormatted}
                  </span>
                  <span className="block text-[10px] text-[#8F8A84]">
                    {item.billingCycle}
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-[#8F8A84] transition group-hover:translate-x-0.5 group-hover:text-[#F5F5F5]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
