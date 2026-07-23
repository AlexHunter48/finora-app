import { ArrowRight, Sparkles } from "lucide-react";

export default function InsightCard() {
  return (
    <section className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-b from-[#1A1815] to-[#141311] p-5 text-[#F5F5F5] shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:p-6">
      <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#C9733D]/15 blur-[90px]" />
      <div className="bg-[#C9733D]/05 pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full blur-[90px]" />

      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#C9733D]/30 bg-[#C9733D]/10 text-[#C9733D] shadow-[0_0_20px_rgba(201,115,61,0.15)] sm:h-14 sm:w-14">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9733D]/30 bg-[#C9733D]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#C9733D]">
                Smart Insight
              </span>
            </div>

            <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#F5F5F5] sm:text-2xl">
              You could save <span className="text-[#C9733D]">₦3,500</span> this
              month.
            </h2>

            <p className="mt-1.5 max-w-xl text-xs leading-relaxed font-normal text-[#8F8A84] sm:text-sm">
              We detected 2 unused subscriptions. Cancelling them reduces your
              recurring expenses without impacting your daily habits.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center lg:shrink-0">
          <button className="rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-4 py-3 text-xs font-semibold text-[#8F8A84] transition-all duration-200 hover:border-white/15 hover:bg-[#23211E] hover:text-[#F5F5F5] sm:px-5">
            Dismiss
          </button>

          <button className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9733D] to-[#D87F46] px-5 py-3 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(201,115,61,0.25)] transition-all duration-200 hover:shadow-[0_6px_25px_rgba(201,115,61,0.4)] active:scale-[0.98]">
            <span>Review Subscriptions</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
