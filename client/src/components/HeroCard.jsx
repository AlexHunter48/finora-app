import { ChevronDown, PiggyBank } from "lucide-react";

export default function HeroCard() {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#141311] p-5 text-[#F5F5F5] shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:p-6">
      <div className="pointer-events-none absolute top-0 -right-10 h-60 w-60 rounded-full bg-[#C9733D]/10 blur-[90px]" />

      <div className="relative z-10 flex flex-col gap-5">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#A8A39B]">Total spent this month</p>
            <button className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#1D1C1A] px-3 py-1.5 text-xs text-[#F5F5F5] transition hover:border-[#C9733D]">
              May 2025
              <ChevronDown size={12} className="text-[#A8A39B]" />
            </button>
          </div>

          <div className="mt-2 grid grid-cols-12 items-end gap-2">
            <div className="col-span-5 sm:col-span-5">
              <h1 className="text-2xl font-semibold tracking-tight text-[#F5F5F5] sm:text-3xl">
                ₦68,450
              </h1>
              <div className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[#C9733D]">
                <span>↗ 3.8%</span>
                <span className="font-normal text-[#A8A39B]">
                  vs last month
                </span>
              </div>
            </div>

            <div className="col-span-7 h-16 w-full overflow-hidden sm:col-span-7">
              <svg
                viewBox="0 0 300 90"
                className="h-full w-full"
                preserveAspectRatio="none"
                fill="none"
              >
                <defs>
                  <linearGradient id="orangeFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9733D" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#C9733D" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0 70 C30 70 50 50 80 55 S130 65 170 35 S220 40 260 15 L300 10 L300 90 L0 90 Z"
                  fill="url(#orangeFade)"
                />

                <path
                  d="M0 70 C30 70 50 50 80 55 S130 65 170 35 S220 40 260 15 L300 10"
                  stroke="#C9733D"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />

                <circle cx="298" cy="10" r="4" fill="#F07B3A" />
              </svg>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/[0.06]" />

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
          <div className="flex flex-col">
            <p className="text-xs text-[#A8A39B]">Budget remaining</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-[#F5F5F5] sm:text-xl">
              ₦31,550
            </h2>
            <p className="mt-0.5 text-xs text-[#A8A39B]">44% of budget</p>

            <div className="mt-2.5 h-1.5 w-full max-w-[110px] rounded-full bg-[#2A2825]">
              <div className="h-full w-[44%] rounded-full bg-[#C9733D]" />
            </div>
          </div>

          <div className="h-16 w-px bg-white/[0.06]" />

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <p className="text-xs text-[#A8A39B]">Potential savings</p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-[#F5F5F5] sm:text-xl">
                ₦3,500
              </h2>
              <p className="mt-0.5 text-[11px] text-[#C9733D] sm:text-xs">
                2 unused subscriptions
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1D1C1A]">
              <PiggyBank
                size={20}
                strokeWidth={1.8}
                className="text-[#C9733D]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
