import { useNavigate } from "react-router-dom";
import heroBg from "../assets/hero-bg.png";
import mobileHeroBg from "../assets/finora-hero-mobile.png";
import Button from "./Button";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundPosition: "80% center",
      }}
    >
      <div className="absolute top-[63%] left-[19%] z-20 -translate-y-1/2 md:top-[62%] md:left-[43%] lg:top-[60%] lg:left-[60%]">
        <div className="relative w-62 py-2 md:w-72 md:px-5 md:py-4">
          <div className="absolute inset-0 -z-10 drop-shadow-[0_0_8px_rgba(34,197,94,0.25)] filter">
            <svg
              className="h-full w-full"
              viewBox="0 0 288 120"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 16 0 
     H 272 
     A 16 16 0 0 1 288 16 
     V 80 
     A 16 16 0 0 1 272 96 
     H 190 
     L 174 118 
     L 162 96 
     H 16 
     A 16 16 0 0 1 0 80 
     V 16 
     A 16 16 0 0 1 16 0 Z"
                fill="rgba(0,0,0,0.85)"
                stroke="rgba(34,197,94,0.45)"
                strokeWidth="1.8"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-start gap-3 px-1 pb-1">
            {/* Netflix Icon Container: Dark background + Red SVG N */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black shadow-lg">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.398 0v24c1.386-.392 2.845-.676 4.362-.845V8.668l5.008 14.823c1.676.135 3.295.42 4.834.845V0h-4.362v13.698L10.196 0z"
                  fill="#E50914"
                />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[13px] leading-snug font-semibold text-stone-300">
                Your Netflix subscription is renewing{" "}
                <span className="text-emerald-400">tomorrow</span>
              </p>
              <div className="mt-2 flex items-center justify-between">
                {/* <span className="text-[11px] text-white/40">
                  Manage reminder
                </span> */}
                <span className="text-[11px] text-white/25">›</span>
              </div>
            </div>

            <span className="mt-0.5 shrink-0 text-[10px] font-medium text-white/25">
              now
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0e0d]/80 via-[#0f0e0d]/50 to-transparent md:bg-gradient-to-r md:from-[#0f0e0d]/90 md:via-[#0f0e0d]/60 md:to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-start px-6 pt-17 pb-12 md:pt-28 md:pb-0 lg:justify-center lg:px-8 lg:pt-17 xl:px-20">
        <div className="mt-6 max-w-xs sm:max-w-sm md:mt-20 md:max-w-lg lg:mt-0 lg:max-w-xl">
          {/* <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-[#b37d3e]" />
            <span className="text-xs font-medium text-white/70">
              Smart subscription tracking
            </span>
          </div> */}

          <h1 className="mb-4 text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl md:text-5xl lg:text-5xl">
            Your money.
            <br />
            <span className="text-[#b37d3e]">
              Finally
              <br />
              accounted for.
            </span>
          </h1>

          <p className="mb-8 text-sm leading-relaxed text-white/60 sm:text-base md:mb-10 md:text-lg">
            Track subscriptions, manage expenses, and never be caught off guard
            by unexpected renewals.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/Sign-up")}
              className="rounded-full bg-[#b37d3e] px-6 py-3 text-sm font-bold text-zinc-950 transition-all duration-200 hover:bg-[#c98d46] md:px-8 md:py-4 md:text-base"
            >
              Get started for free
            </button>

            <a
              href="#how-it-works"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 md:px-8 md:py-4 md:text-base"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* <div className="mt-auto flex gap-8 border-t border-white/10 pt-6 md:hidden">
          <div>
            <div className="text-lg font-bold text-white">₦12k</div>
            <div className="text-[10px] text-white/40">avg monthly savings</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">3 min</div>
            <div className="text-[10px] text-white/40">to get started</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">100%</div>
            <div className="text-[10px] text-white/40">read-only access</div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
