import { useEffect, useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { useDash } from "../context/DashboardContext";
import HeroCard from "../components/HeroCard";
import QuickActions from "../components/QuickActions";
import SpendingOverview from "../components/SpendingOverview";
import CategoryChart from "../components/CategoryChart";
import UpcomingRenewals from "../components/UpcomingRenewals";
import RecentTransactions from "../components/RecentTransactions";
import InsightCard from "../components/InsightCard";

export default function Overview() {
  const { isOpen, setIsOpen } = useDash();
  const [greeting, setGreeting] = useState("");
  const name = "Alex";
  const emoji = "👋";

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning " + name + emoji);
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon" + name + emoji);
    } else if (hour >= 17 && hour < 22) {
      setGreeting("Good evening" + name + emoji);
    } else {
      setGreeting("Hello, night owl");
    }
  }, []);

  return (
    <section className="min-h-dvh overflow-y-auto bg-[#0F0E0D] px-5 pt-6 pb-28 lg:px-10 lg:py-10">
      <header className="mb-8 flex items-center justify-between lg:hidden">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#1B1A18] text-[#F5F5F5] transition-all duration-300 hover:border-[#C9733D]"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <h2 className="text-[18px] font-semibold tracking-[0.55em] text-[#F5F5F5]">
          FINORA
        </h2>

        <div className="relative">
          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#1B1A18] text-[#F5F5F5] transition-all duration-300 hover:border-[#C9733D]">
            <Bell size={19} strokeWidth={1.8} />
          </button>

          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#C9733D]" />
        </div>
      </header>

      <header className="mb-10 hidden items-center justify-between lg:flex">
        <div>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#F7F5F3]">
            {greeting}
          </h1>

          <p className="mt-3 text-[15px] text-[#8F8A84]">
            Here's your financial overview
          </p>
        </div>

        <div className="relative">
          <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#1B1A18] text-[#F5F5F5] transition-all duration-300 hover:border-[#C9733D]">
            <Bell size={20} />
          </button>

          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#C9733D]" />
        </div>
      </header>

      <div className="mb-7 lg:hidden">
        <h1 className="text-[32px] leading-none font-semibold tracking-[-0.04em] text-[#F7F5F3]">
          {greeting}
        </h1>

        <p className="mt-3 text-[15px] text-[#8F8A84]">
          Here's your financial overview
        </p>
      </div>

      <div className="mb-6">
        <HeroCard />
      </div>

      <div className="mb-6">
        <QuickActions />
      </div>

      <div className="mb-6 grid gap-6 xl:grid-cols-2">
        <SpendingOverview /> <CategoryChart />
      </div>

      <div className="mb-6 grid gap-6 xl:grid-cols-2">
        <UpcomingRenewals /> <RecentTransactions />
      </div>

      <InsightCard />
    </section>
  );
}
