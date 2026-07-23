import {
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
  Utensils,
  Wallet,
  ChevronRight,
} from "lucide-react";

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

const transactions = [
  {
    id: "1",
    title: "Netflix",
    category: "Subscription",
    amount: "-₦6,500",
    date: "Today, 9:42 AM",
    type: "expense",
    icon: NetflixLogo,
    badgeBg: "bg-[#E50914]/10 border-[#E50914]/20",
  },
  {
    id: "2",
    title: "Salary Deposit",
    category: "Income",
    amount: "+₦250,000",
    date: "Yesterday",
    type: "income",
    icon: Wallet,
    iconColor: "text-[#45C27A]",
    badgeBg: "bg-[#45C27A]/10 border-[#45C27A]/20",
  },
  {
    id: "3",
    title: "Uber Ride",
    category: "Transport",
    amount: "-₦4,200",
    date: "Yesterday",
    type: "expense",
    icon: UberLogo,
    badgeBg: "bg-white/10 border-white/20",
  },
  {
    id: "4",
    title: "Chicken Republic",
    category: "Food & Dining",
    amount: "-₦7,300",
    date: "Monday",
    type: "expense",
    icon: Utensils,
    iconColor: "text-[#E28B51]",
    badgeBg: "bg-[#E28B51]/10 border-[#E28B51]/20",
  },
  {
    id: "5",
    title: "Spotify",
    category: "Subscription",
    amount: "-₦2,300",
    date: "Sunday",
    type: "expense",
    icon: SpotifyLogo,
    badgeBg: "bg-[#1DB954]/10 border-[#1DB954]/20",
  },
];

export default function RecentTransactions() {
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
        {transactions.map((item) => {
          const IconComponent = item.icon;
          const isIncome = item.type === "income";

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
                      isIncome
                        ? "bg-[#45C27A] text-[#141311]"
                        : "bg-[#2A201B] text-[#C9733D]"
                    }`}
                  >
                    {isIncome ? (
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
                    {item.category} • {item.date}
                  </p>
                </div>
              </div>

              <div className="ml-3 shrink-0 text-right">
                <span
                  className={`text-sm font-semibold tracking-tight whitespace-nowrap ${
                    isIncome ? "text-[#45C27A]" : "text-[#F5F5F5]"
                  }`}
                >
                  {item.amount}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#1D1C1A] py-3 text-xs font-semibold text-[#C9733D] transition hover:border-[#C9733D]/40 hover:bg-[#23211E]">
        <span>View All Transactions</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
