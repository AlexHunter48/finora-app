import { useEffect, useState } from "react";
import { Bell, Landmark, Menu, X } from "lucide-react";
// @ts-ignore
import MonoConnect from "@mono.co/connect.js";
import { useDash } from "../context/DashboardContext";
import HeroCard from "../components/HeroCard";
import QuickActions from "../components/QuickActions";
import SpendingOverview from "../components/SpendingOverview";
import CategoryChart from "../components/CategoryChart";
import UpcomingRenewals from "../components/UpcomingRenewals";
import RecentTransactions from "../components/RecentTransactions";
import InsightCard from "../components/InsightCard";
import { useAuth } from "../context/AuthContext";

export default function Overview() {
  const { isOpen, setIsOpen } = useDash();
  const { token, user, setUser } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [isBankConnected, setIsBankConnected] = useState(false);

  const initial = user.name.split(" ")[0];

  console.log(initial, user.name);

  const emoji = "👋";

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting(`Good morning ${initial} ${emoji}`);
    } else if (hour >= 12 && hour < 17) {
      setGreeting(`Good afternoon ${initial} ${emoji}`);
    } else if (hour >= 17 && hour < 22) {
      setGreeting(`Good evening ${initial} ${emoji}`);
    } else {
      setGreeting("Hello, night owl");
    }
  }, []);

  const handleConnectBank = () => {
    const monoInstance = new MonoConnect({
      key: import.meta.env.VITE_MONO_PUBLIC_KEY,
      onSuccess: async (data) => {
        try {
          const response = await fetch(
            "http://localhost:3000/api/bank/connect",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ code: data.code }),
            },
          );

          const result = await response.json();
          console.log(result);

          if (result.success) {
            console.log("Connected! Permanent Account ID:", result.accountId);
            setIsBankConnected(true);

            setUser((prevUser) => {
              const updatedUser = {
                ...prevUser,
                monoAccountId: [
                  ...(prevUser?.monoAccountId || []),
                  result.accountId,
                ],
              };

              localStorage.setItem("user", JSON.stringify(updatedUser));

              return updatedUser;
            });
          }
        } catch (error) {
          console.error("Error exchanging code:", error);
        }
      },
      onClose: () => console.log("Mono widget closed"),
    });

    monoInstance.setup();
    monoInstance.open();
  };

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
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#F7F5F3] capitalize">
            <span className="capitalize">{greeting}</span>
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

      {user?.monoAccountId?.length > 0 ? (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
            <p className="text-sm font-medium text-neutral-200">
              Bank Account Linked
            </p>
          </div>
          <button className="text-xs text-neutral-400 underline hover:text-white">
            Manage Accounts
          </button>
        </div>
      ) : (
        <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-3xl border border-[#C9733D]/30 bg-[#1B1A18] p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#C9733D]/20 bg-[#C9733D]/10 text-[#C9733D]">
              <Landmark size={22} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#F7F5F3]">
                Connect your primary bank account
              </h3>
              <p className="mt-1 text-sm text-[#8F8A84]">
                Link Mono to automatically sync transactions and track
                subscriptions.
              </p>
            </div>
          </div>

          <button
            onClick={handleConnectBank}
            className="w-full shrink-0 rounded-2xl bg-[#C9733D] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#b56534] sm:w-auto"
          >
            Connect Bank
          </button>
        </div>
      )}

      <div className="mb-6">
        <HeroCard isBankConnected={isBankConnected} />
      </div>

      <div className="mb-6">
        <QuickActions onConnectBank={handleConnectBank} />
      </div>

      <div className="mb-6 grid gap-6 xl:grid-cols-2">
        <SpendingOverview />
        <CategoryChart />
      </div>

      <div className="mb-6 grid gap-6 xl:grid-cols-2">
        <UpcomingRenewals />
        <RecentTransactions />
      </div>

      <InsightCard />
    </section>
  );
}
