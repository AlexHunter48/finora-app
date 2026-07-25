import { CalendarClock, ChevronRight, AlertCircle } from "lucide-react";

const NetflixLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#E50914]">
    <path d="M5.398 0v24h4.131l.036-12.871 4.965 12.871h4.072V0h-4.072l-.036 12.871L9.529 0H5.398z" />
  </svg>
);

const SpotifyLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#1DB954]">
    <path d="M12 0C5.376 0 0 5.377 0 12c0 6.623 5.377 12 12 12 6.623 0 12-5.377 12-12 0-6.623-5.377-12-12-12zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.019zm1.441-3.24c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.242 1.26zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.36z" />
  </svg>
);

const YoutubeLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#FF0000]">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const OpenAiLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#10A37F]">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0813 4.779-2.7582a.7938.7938 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4952 4.4952zm-8.86-3.834a4.4755 4.4755 0 0 1-.5358-3.0084l.142.0831 4.779 2.7582a.7938.7938 0 0 0 .7928 0l5.8338-3.3692v2.3372a.071.071 0 0 1-.0332.0568L10.7 20.0881a4.504 4.504 0 0 1-6.3001-1.493zm-1.0408-9.6917a4.4755 4.4755 0 0 1 2.3406-1.9675l-.0019.1636v5.5164a.7938.7938 0 0 0 .3927.6813l5.8338 3.3692-2.02 1.1686a.071.071 0 0 1-.0712 0l-4.8383-2.7938a4.504 4.504 0 0 1-1.6357-6.1378zm13.1118 1.4883-5.8338-3.3692 2.02-1.1686a.071.071 0 0 1 .0712 0l4.8383 2.7938a4.504 4.504 0 0 1-.7049 8.1053v-5.68a.7938.7938 0 0 0-.3908-.6813zm2.5761-2.1583a4.4755 4.4755 0 0 1 .5358 3.0084l-.142-.0831-4.779-2.7582a.7938.7938 0 0 0-.7928 0L9.0433 11.956v-2.3372a.071.071 0 0 1 .0332-.0568l4.8383-2.7938a4.504 4.504 0 0 1 6.3001 1.493zm-10.013 3.6305 2.7153-1.5677 2.7153 1.5677v3.1354l-2.7153 1.5677-2.7153-1.5677z" />
  </svg>
);

const renewals = [
  {
    name: "Netflix",
    plan: "Premium 4K",
    dueText: "Due Today",
    isUrgent: true,
    amount: "₦6,500",
    icon: NetflixLogo,
    badgeBg: "bg-[#E50914]/10 border-[#E50914]/20",
  },
  {
    name: "Spotify",
    plan: "Individual",
    dueText: "In 3 days",
    isUrgent: false,
    amount: "₦2,300",
    icon: SpotifyLogo,
    badgeBg: "bg-[#1DB954]/10 border-[#1DB954]/20",
  },
  {
    name: "YouTube",
    plan: "Premium",
    dueText: "In 8 days",
    isUrgent: false,
    amount: "₦3,200",
    icon: YoutubeLogo,
    badgeBg: "bg-[#FF0000]/10 border-[#FF0000]/20",
  },
  {
    name: "ChatGPT Plus",
    plan: "Pro Plan",
    dueText: "In 12 days",
    isUrgent: false,
    amount: "₦32,000",
    icon: OpenAiLogo,
    badgeBg: "bg-[#10A37F]/10 border-[#10A37F]/20",
  },
];

export default function UpcomingRenewals() {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#141311] p-5 text-[#F5F5F5] shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#8F8A84]">Upcoming Renewals</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[#F5F5F5]">
            Subscriptions
          </h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#1D1C1A] text-[#C9733D] shadow-inner">
          <CalendarClock size={18} />
        </div>
      </div>

      <div className="space-y-3">
        {renewals.map((item) => {
          const LogoComponent = item.icon;

          return (
            <button
              key={item.name}
              className="group flex w-full items-center justify-between rounded-xl border border-white/[0.04] bg-[#1A1917]/70 p-3.5 transition-all duration-200 hover:border-[#C9733D]/40 hover:bg-[#1A1917] hover:shadow-lg active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-sm ${item.badgeBg}`}
                >
                  <LogoComponent />
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-[#F5F5F5]">
                      {item.name}
                    </h4>

                    {item.isUrgent && (
                      <span className="flex items-center gap-1 rounded-full border border-[#C9733D]/30 bg-[#C9733D]/15 px-2 py-0.5 text-[10px] font-medium text-[#C9733D]">
                        <AlertCircle size={10} />
                        Today
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 text-[12px] text-[#8F8A84]">
                    {item.plan} •{" "}
                    <span
                      className={
                        item.isUrgent
                          ? "font-medium text-[#C9733D]"
                          : "text-[#8F8A84]"
                      }
                    >
                      {item.dueText}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="text-right">
                  <p className="text-sm font-semibold tracking-tight text-[#F5F5F5]">
                    {item.amount}
                  </p>
                  <p className="text-[10px] font-normal text-[#8F8A84]">
                    Monthly
                  </p>
                </div>

                <ChevronRight
                  size={16}
                  className="text-[#8F8A84] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#C9733D]"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
