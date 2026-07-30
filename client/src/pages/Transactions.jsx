import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Plus,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  CreditCard,
  CheckCircle2,
  Clock,
  Utensils,
  ShoppingBag,
  Zap,
  Code2,
  Tv,
  Wallet,
  ArrowRightLeft,
} from "lucide-react";
import { useTransactions } from "../context/TransactionsContext";

const categoryConfig = {
  income: {
    label: "Income & Transfers",
    icon: Wallet,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  transfers: {
    label: "Bank Transfers",
    icon: ArrowRightLeft,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
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
};

const isObjectId = (str) =>
  typeof str === "string" && /^[0-9a-fA-F]{24}$/.test(str.trim());

const cleanTransactionTitle = (rawStr, isIncome) => {
  if (!rawStr || typeof rawStr !== "string") return "";
  const str = rawStr.trim();

  if (str.includes("/")) {
    const parts = str
      .split("/")
      .map((p) => p.trim())
      .filter(Boolean);

    const bankKeywords = [
      "NIP",
      "KUDA",
      "GTB",
      "GTBANK",
      "ACCESS",
      "ZENITH",
      "UBA",
      "FIRSTBANK",
      "POS",
      "WEB",
      "TRANSFER",
      "TRF",
      "PAYSTACK",
      "FLUTTERWAVE",
      "MONIEPOINT",
      "OPAY",
      "PALMPAY",
    ];

    const nameParts = parts.filter((p) => {
      const upper = p.toUpperCase();
      const isNumOrTransfer = /^\d+$/.test(p) || /^TRANSFER\s*\d*$/i.test(p);
      return !bankKeywords.includes(upper) && !isNumOrTransfer;
    });

    if (nameParts.length > 0) {
      const rawName = nameParts.join(" ");
      const formattedName = rawName
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return isIncome
        ? `Transfer from ${formattedName}`
        : `Transfer to ${formattedName}`;
    }
  }

  return str;
};

const formatCurrency = (val) =>
  val.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const normalizeTransaction = (tx) => {
  const rawId = tx._id || tx.id || "";
  const shortId = rawId ? `...${rawId.slice(-6)}` : "—";

  const lowerType = String(tx.type || "")
    .toLowerCase()
    .trim();
  const rawCat = (tx.category || "").toLowerCase().trim();

  let isIncome = false;
  if (
    lowerType === "income" ||
    lowerType === "credit" ||
    lowerType === "inflow" ||
    rawCat.includes("income") ||
    rawCat.includes("salary") ||
    rawCat.includes("deposit")
  ) {
    isIncome = true;
  } else if (
    lowerType === "expense" ||
    lowerType === "debit" ||
    lowerType === "outflow"
  ) {
    isIncome = false;
  } else if (typeof tx.amount === "number" && tx.amount < 0) {
    isIncome = false;
  }

  let categoryKey = "";
  if (categoryConfig[rawCat]) {
    categoryKey = rawCat;
  } else if (rawCat.includes("food") || rawCat.includes("din")) {
    categoryKey = "food";
  } else if (rawCat.includes("dev") || rawCat.includes("saas")) {
    categoryKey = "dev";
  } else if (rawCat.includes("util") || rawCat.includes("power")) {
    categoryKey = "utilities";
  } else if (rawCat.includes("shop")) {
    categoryKey = "shopping";
  } else if (rawCat.includes("subscrip")) {
    categoryKey = "subscriptions";
  }

  if (!categoryKey) {
    categoryKey = isIncome ? "income" : "transfers";
  }

  const titleCandidates = [
    tx.title,
    tx.merchant,
    tx.name,
    tx.description,
    tx.narration,
    tx.payee,
    tx.recipient,
    tx.sender,
    tx.counterparty,
    tx.notes,
    tx.reference,
  ];

  let rawTitle = titleCandidates.find(
    (item) => item && typeof item === "string" && !isObjectId(item),
  );

  let title = rawTitle ? cleanTransactionTitle(rawTitle, isIncome) : "";

  if (!title) {
    title = isIncome ? "Bank Transfer Inflow" : "Bank Transfer Outflow";
  }

  let account =
    tx.account ||
    tx.paymentMethod ||
    tx.payment_method ||
    tx.channel ||
    tx.provider ||
    "Default Wallet";

  let rawNum = 0;
  if (typeof tx.amount === "number") {
    rawNum = Math.abs(tx.amount);
  } else if (typeof tx.amount === "string") {
    const cleaned = tx.amount.replace(/,/g, "").replace(/[^0-9.]/g, "");
    rawNum = parseFloat(cleaned) || 0;
  }

  const isKoboUnit =
    tx.isKobo ||
    (typeof tx.amount === "number" && Number.isInteger(tx.amount)) ||
    (typeof tx.amount === "string" && !tx.amount.includes("."));

  const numVal = isKoboUnit ? rawNum / 100 : rawNum;
  const formattedAmount = `₦${formatCurrency(numVal)}`;

  let dateStr = tx.date || "N/A";
  let timeStr = tx.time || "00:00";

  const rawDate = tx.date || tx.createdAt || tx.timestamp;
  if (rawDate) {
    const parsed = new Date(rawDate);
    if (!isNaN(parsed.getTime())) {
      dateStr = parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      timeStr = parsed.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
  }

  const status = (tx.status || "completed").toLowerCase();

  return {
    id: rawId || Math.random().toString(),
    shortId,
    title,
    categoryKey,
    account,
    type: isIncome ? "income" : "expense",
    status,
    date: dateStr,
    time: timeStr,
    isIncome,
    numVal,
    formattedAmount,
  };
};

export default function Transactions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const context = useTransactions() || {};
  const {
    transactions = [],
    monthlyTransactions = [],
    totalInflow = 0,
    totalOutflow = 0,
    creditTransactions = [],
    debitTransactions = [],
  } = context;

  const rawData =
    monthlyTransactions && monthlyTransactions.length > 0
      ? monthlyTransactions
      : transactions;

  const normalizedTransactions = rawData.map(normalizeTransaction);

  const calculatedInflow = normalizedTransactions
    .filter((tx) => tx.isIncome)
    .reduce((sum, tx) => sum + tx.numVal, 0);

  const calculatedOutflow = normalizedTransactions
    .filter((tx) => !tx.isIncome)
    .reduce((sum, tx) => sum + tx.numVal, 0);

  const calculatedIncomeCount = normalizedTransactions.filter(
    (tx) => tx.isIncome,
  ).length;
  const calculatedExpenseCount = normalizedTransactions.filter(
    (tx) => !tx.isIncome,
  ).length;

  const displayInflow = calculatedInflow > 0 ? calculatedInflow : totalInflow;
  const displayOutflow =
    calculatedOutflow > 0 ? calculatedOutflow : totalOutflow;
  const netPosition = displayInflow - displayOutflow;

  const formattedNetPosition =
    netPosition >= 0
      ? `+₦${formatCurrency(netPosition)}`
      : `-₦${formatCurrency(Math.abs(netPosition))}`;

  const filteredTransactions = normalizedTransactions.filter((tx) => {
    const matchesSearch =
      tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#0F0E0D] px-4 py-6 pb-28 text-[#F5F5F5] sm:px-8 lg:px-10 lg:pb-10">
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

      <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Total Inflow</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <ArrowDownLeft size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦{formatCurrency(displayInflow)}
          </p>
          <p className="mt-1 text-[11px] font-medium text-emerald-400">
            {calculatedIncomeCount || creditTransactions?.length || 0} income
            records
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Total Outflow</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            ₦{formatCurrency(displayOutflow)}
          </p>
          <p className="mt-1 text-[11px] text-[#8F8A84]">
            {calculatedExpenseCount || debitTransactions?.length || 0} expense
            records
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Net Position</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#C9733D]/20 bg-[#C9733D]/10 text-[#C9733D]">
              <Wallet size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            {formattedNetPosition}
          </p>
          <p
            className={`mt-1 text-[11px] font-medium ${
              netPosition >= 0 ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {netPosition >= 0 ? "Positive cashflow" : "Negative cashflow"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141311] p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between text-[#8F8A84]">
            <span className="text-xs font-medium">Recorded Volume</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <CreditCard size={16} />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl">
            {normalizedTransactions.length} Transactions
          </p>
          <p className="mt-1 text-[11px] text-[#8F8A84]">This month</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
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

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141311] shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
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

            <tbody className="divide-y divide-white/[0.04]">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-[#8F8A84]"
                  >
                    No transactions recorded yet.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const cat =
                    categoryConfig[tx.categoryKey] || categoryConfig.transfers;
                  const CategoryIcon = cat.icon;

                  return (
                    <tr
                      key={tx.id}
                      className="group transition hover:bg-white/[0.02]"
                    >
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
                              {tx.shortId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium ${cat.bg}`}
                        >
                          {cat.label}
                        </span>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap text-[#8F8A84]">
                        {tx.account}
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap text-[#8F8A84]">
                        <div className="flex flex-col">
                          <span className="font-medium text-[#F5F5F5]">
                            {tx.date}
                          </span>
                          <span className="text-[10px] text-[#8F8A84]">
                            {tx.time}
                          </span>
                        </div>
                      </td>

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

                      <td className="px-5 py-4 text-right text-sm font-bold whitespace-nowrap">
                        <span
                          className={
                            tx.isIncome ? "text-emerald-400" : "text-[#F5F5F5]"
                          }
                        >
                          {tx.isIncome
                            ? `+${tx.formattedAmount}`
                            : `-${tx.formattedAmount}`}
                        </span>
                      </td>

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
