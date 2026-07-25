import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Plus,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  MoreHorizontal,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  Utensils,
  ShoppingBag,
  Zap,
  Code2,
  Tv,
  Wallet,
} from "lucide-react";

// Category config with dynamic icons and badge styling
const categoryConfig = {
  subscriptions: {
    label: "Subscriptions",
    icon: Tv,
    color: "text-[#C9733D]",
    bg: "bg-[#C9733D]/10 border-[#C9733D]/20",
  },
  food: {
    label: "Food & Dining",
    icon: Utensils,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  dev: {
    label: "Development & SaaS",
    icon: Code2,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  utilities: {
    label: "Utilities & Power",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  shopping: {
    label: "Shopping",
    icon: ShoppingBag,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  income: {
    label: "Income & Transfers",
    icon: Wallet,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
};

const initialTransactions = [
  {
    id: "tx-101",
    title: "Client Retainer Payment",
    category: "income",
    type: "income",
    amount: "₦350,000",
    date: "Jul 22, 2026",
    time: "14:32",
    status: "completed",
    account: "Kuda Bank (***4012)",
  },
  {
    id: "tx-102",
    title: "Adobe CC Renewal",
    category: "subscriptions",
    type: "expense",
    amount: "₦45,000",
    date: "Jul 21, 2026",
    time: "09:15",
    status: "completed",
    account: "Virtual Visa (***8821)",
  },
  {
    id: "tx-103",
    title: "Chicken Republic",
    category: "food",
    type: "expense",
    amount: "₦8,500",
    date: "Jul 20, 2026",
    time: "19:45",
    status: "completed",
    account: "Mastercard (***1102)",
  },
  {
    id: "tx-104",
    title: "Ikeja Electric Units",
    category: "utilities",
    type: "expense",
    amount: "₦20,000",
    date: "Jul 19, 2026",
    time: "11:04",
    status: "completed",
    account: "GTBank (***5591)",
  },
  {
    id: "tx-105",
    title: "Vercel Pro Subscription",
    category: "dev",
    type: "expense",
    amount: "₦32,000",
    date: "Jul 18, 2026",
    time: "03:10",
    status: "pending",
    account: "Virtual Visa (***8821)",
  },
  {
    id: "tx-106",
    title: "Slot Nigeria (Earbuds)",
    category: "shopping",
    type: "expense",
    amount: "₦28,500",
    date: "Jul 15, 2026",
    time: "16:20",
    status: "completed",
    account: "Mastercard (***1102)",
  },
  {
    id: "tx-107",
    title: "Freelance Project Deposit",
    category: "income",
    type: "income",
    amount: "₦150,000",
    date: "Jul 12, 2026",
    time: "10:00",
    status: "completed",
    account: "Kuda Bank (***4012)",
  },
];

export default function Transactions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = initialTransactions.filter((tx) => {
    const matchesSearch =
      tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.account.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#0F0E0D] px-4 py-6 pb-28 text-[#F5F5F5] sm:px-8 lg:px-10 lg:pb-10">
      {/* 1. Header with Back Button & Action Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/[0.08] bg-[#141311] text-[#8F8A84] transition-all hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-[#F5F5F5] active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-xs font-medium tracking-wider text-[#8F8A84] uppercase">
              Ledger Feed
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
              Transactions
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#141311] px-4 py-2.5 text-xs font-medium text-[#F5F5F5] transition hover:border-white/[0.15] hover:bg-white/[0.04]">
            <Download size={15} className="text-[#8F8A84]" />
            <span>Export CSV</span>
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C9733D] to-[#D87F46] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(201,115,61,0.25)] transition hover:shadow-[0_6px_25px_rgba(201,115,61,0.4)] active:scale-[0.98]">
            <Plus size={16} />
            <span>Log Transaction</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Inflow */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Total Inflow</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <ArrowDownLeft size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦500,000
          </p>
          <p className="mt-1 text-[11px] font-medium text-emerald-400">
            2 income records
          </p>
        </div>

        {/* Total Outflow */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Total Outflow</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦134,000
          </p>
          <p className="mt-1 text-[11px] text-[#8F8A84]">5 expense records</p>
        </div>

        {/* Net Flow Balance */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Net Position</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#C9733D]/20 bg-[#C9733D]/10 text-[#C9733D]">
              <Wallet size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            +₦366,000
          </p>
          <p className="mt-1 text-[11px] font-medium text-emerald-400">
            Positive cashflow
          </p>
        </div>

        {/* Total Activity */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Recorded Volume</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <CreditCard size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            7 Transactions
          </p>
          <p className="mt-1 text-[11px] text-[#8F8A84]">This month</p>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative max-w-md flex-1">
          <Search
            size={16}
            className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#8F8A84]"
          />
          <input
            type="text"
            placeholder="Search by merchant or account..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-[#141311] py-2.5 pr-4 pl-10 text-xs text-[#F5F5F5] placeholder-[#8F8A84] transition outline-none focus:border-[#C9733D]/50 focus:ring-1 focus:ring-[#C9733D]/50"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {/* Type Filter */}
          <div className="flex items-center rounded-xl border border-white/[0.08] bg-[#141311] p-1">
            {[
              { id: "all", label: "All" },
              { id: "income", label: "Income" },
              { id: "expense", label: "Expenses" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTypeFilter(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  typeFilter === tab.id
                    ? "bg-[#C9733D] text-white shadow-md"
                    : "text-[#8F8A84] hover:text-[#F5F5F5]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-white/[0.08] bg-[#141311] px-3 py-2 text-xs font-medium text-[#8F8A84] transition outline-none focus:border-[#C9733D]/50 focus:text-[#F5F5F5]"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* 4. Transactions List Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141311] shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            {/* Table Header */}
            <thead className="border-b border-white/[0.06] bg-[#181715] text-[#8F8A84]">
              <tr>
                <th className="px-5 py-4 font-medium">Transaction</th>
                <th className="px-5 py-4 font-medium">Category</th>
                <th className="px-5 py-4 font-medium">Payment Method</th>
                <th className="px-5 py-4 font-medium">Date & Time</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Amount</th>
                <th className="px-4 py-4 text-center font-medium">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-white/[0.04]">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-[#8F8A84]"
                  >
                    No transactions match your search filter.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const cat =
                    categoryConfig[tx.category] || categoryConfig.subscriptions;
                  const CategoryIcon = cat.icon;
                  const isIncome = tx.type === "income";

                  return (
                    <tr
                      key={tx.id}
                      className="group transition hover:bg-white/[0.02]"
                    >
                      {/* Merchant Title */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${cat.bg}`}
                          >
                            <CategoryIcon className={`h-4 w-4 ${cat.color}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-[#F5F5F5]">
                              {tx.title}
                            </p>
                            <p className="text-[11px] text-[#8F8A84]">
                              {tx.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium ${cat.bg}`}
                        >
                          {cat.label}
                        </span>
                      </td>

                      {/* Payment Method */}
                      <td className="px-5 py-4 whitespace-nowrap text-[#8F8A84]">
                        {tx.account}
                      </td>

                      {/* Date & Time */}
                      <td className="px-5 py-4 whitespace-nowrap text-[#8F8A84]">
                        <div className="flex flex-col">
                          <span className="font-medium text-[#F5F5F5]">
                            {tx.date}
                          </span>
                          <span className="text-[10px]">{tx.time}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        {tx.status === "completed" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                            <CheckCircle2 size={12} /> Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-400">
                            <Clock size={12} /> Pending
                          </span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4 text-right text-sm font-bold whitespace-nowrap">
                        <span
                          className={
                            isIncome ? "text-emerald-400" : "text-[#F5F5F5]"
                          }
                        >
                          {isIncome ? `+${tx.amount}` : `-${tx.amount}`}
                        </span>
                      </td>

                      {/* Options menu */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[#8F8A84] transition hover:border-white/[0.08] hover:bg-[#1D1C1A] hover:text-[#F5F5F5]">
                          <MoreHorizontal size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
