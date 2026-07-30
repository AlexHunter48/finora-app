import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Building2,
  Lock,
  Globe,
  Bell,
  CheckCircle2,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("NGN");

  return (
    <div className="min-h-screen bg-[#0F0E0D] px-4 py-6 pb-28 text-[#F5F5F5] sm:px-8 lg:px-10 lg:pb-10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#141311] text-[#8F8A84] hover:text-[#F5F5F5]"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <p className="text-xs font-medium tracking-wider text-[#8F8A84] uppercase">
            System Preferences
          </p>
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
            Settings
          </h1>
        </div>
      </div>

      <div className="mt-8 flex max-w-3xl flex-col gap-6">
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9733D] text-lg font-bold text-white">
              AH
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5F5F5]">
                Alex Hunter
              </h2>
              <p className="text-xs text-[#8F8A84]">alex@example.com</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-6 shadow-lg">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#F5F5F5]">
            <Globe size={18} className="text-[#C9733D]" />
            <span>Display Currency</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { id: "NGN", label: "Nigerian Naira (₦)" },
              { id: "USD", label: "US Dollar ($)" },
              { id: "EUR", label: "Euro (€)" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setCurrency(c.id)}
                className={`rounded-xl border p-3 text-xs font-medium transition ${
                  currency === c.id
                    ? "border-[#C9733D] bg-[#C9733D]/10 text-[#C9733D]"
                    : "border-white/[0.08] bg-[#181715] text-[#8F8A84]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#F5F5F5]">
              <Building2 size={18} className="text-[#C9733D]" />
              <span>Linked Accounts</span>
            </div>
            <button className="text-xs font-medium text-[#C9733D] hover:underline">
              + Link Bank
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {[
              { bank: "Kuda Microfinance", account: "**** 4012", active: true },
              {
                bank: "Guaranty Trust Bank",
                account: "**** 5591",
                active: true,
              },
            ].map((b, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#181715] p-3.5 text-xs"
              >
                <div>
                  <p className="font-semibold text-[#F5F5F5]">{b.bank}</p>
                  <p className="text-[#8F8A84]">{b.account}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 size={12} /> Connected
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
