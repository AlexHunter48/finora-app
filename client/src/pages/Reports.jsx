import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  FileText,
  Loader2,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react";
import { useTransactions } from "../context/TransactionsContext";

export default function Reports() {
  const navigate = useNavigate();
  const { transactions = [], loading, error } = useTransactions();

  const [isExporting, setIsExporting] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  const today = new Date();
  const defaultMonthKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const [selectedMonth, setSelectedMonth] = useState(defaultMonthKey);

  const monthlyTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (!t.date) return false;
      const txDate = new Date(t.date);
      if (isNaN(txDate.getTime())) return false;

      const txMonthKey = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, "0")}`;
      return txMonthKey === selectedMonth;
    });
  }, [transactions, selectedMonth]);

  const grossIncome = useMemo(() => {
    return monthlyTransactions
      .filter((t) => t.type === "credit" || t.type === "income" || t.amount > 0)
      .reduce((sum, t) => sum + Math.abs(Number(t.amount) || 0), 0);
  }, [monthlyTransactions]);

  const totalOutflow = useMemo(() => {
    return monthlyTransactions
      .filter((t) => t.type === "debit" || t.type === "expense" || t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(Number(t.amount) || 0), 0);
  }, [monthlyTransactions]);

  const netRetained = grossIncome - totalOutflow;

  const categoryBreakdown = useMemo(() => {
    return monthlyTransactions
      .filter((t) => t.type === "debit" || t.type === "expense" || t.amount < 0)
      .reduce((acc, t) => {
        const cat = t.category || "Uncategorized";
        acc[cat] = (acc[cat] || 0) + Math.abs(Number(t.amount) || 0);
        return acc;
      }, {});
  }, [monthlyTransactions]);

  const availableMonths = useMemo(() => {
    const monthSet = new Set();
    monthSet.add(defaultMonthKey);

    transactions.forEach((t) => {
      if (t.date) {
        const d = new Date(t.date);
        if (!isNaN(d.getTime())) {
          monthSet.add(
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
          );
        }
      }
    });

    return Array.from(monthSet).sort().reverse();
  }, [transactions, defaultMonthKey]);

  const formatMonthLabel = (key) => {
    const [year, month] = key.split("-");
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const triggerDownload = (filename, content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportFullReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const label = formatMonthLabel(selectedMonth);
      const content = `FINORA FINANCIAL REPORT - ${label.toUpperCase()}\n====================================\nGross Income (Credits): ₦${grossIncome.toLocaleString()}\nTotal Outflow (Debits): ₦${totalOutflow.toLocaleString()}\nNet Retained Capital: ₦${netRetained.toLocaleString()}\nTotal Transactions: ${monthlyTransactions.length}\nGenerated on: ${new Date().toLocaleDateString()}`;

      triggerDownload(
        `Finora_${label.replace(/\s+/g, "_")}_Report.txt`,
        content,
      );
      setIsExporting(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F0E0D] text-[#8F8A84]">
        <Loader2 className="animate-spin text-[#C9733D]" size={32} />
        <span className="ml-3 text-sm">
          Processing Mono transaction data...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F0E0D] text-rose-400">
        <p>Failed to load transactions: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0E0D] px-4 py-6 pb-28 text-[#F5F5F5] sm:px-8 lg:px-10 lg:pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#141311] text-[#8F8A84] transition hover:text-[#F5F5F5]"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-xs font-medium tracking-wider text-[#8F8A84] uppercase">
              Financial Statements
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
              Monthly Reports
            </h1>
          </div>
        </div>

        <button
          onClick={handleExportFullReport}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9733D] to-[#D87F46] px-5 py-3 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(201,115,61,0.25)] transition hover:opacity-95 disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download size={16} />
              <span>Export Full PDF Report</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#141311] p-6 shadow-lg">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#F5F5F5]">
              {formatMonthLabel(selectedMonth)} Executive Summary
            </h2>
            <p className="text-xs text-[#8F8A84]">
              Calculated from {monthlyTransactions.length} synced Mono
              transactions
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-3 py-1.5 text-xs text-[#8F8A84]">
            <Calendar size={14} className="text-[#C9733D]" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="cursor-pointer bg-transparent text-[#F5F5F5] outline-none"
            >
              {availableMonths.map((mKey) => (
                <option
                  key={mKey}
                  value={mKey}
                  className="bg-[#141311] text-[#F5F5F5]"
                >
                  {formatMonthLabel(mKey)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/[0.06] bg-[#181715] p-4 transition hover:border-white/[0.12]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8F8A84]">
                Gross Income (Credits)
              </span>
              <TrendingUp size={16} className="text-emerald-400" />
            </div>
            <p className="mt-2 text-xl font-bold text-emerald-400">
              +₦{grossIncome.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-[#181715] p-4 transition hover:border-white/[0.12]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8F8A84]">
                Total Outflow (Debits)
              </span>
              <TrendingDown size={16} className="text-rose-400" />
            </div>
            <p className="mt-2 text-xl font-bold text-rose-400">
              -₦{totalOutflow.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-[#181715] p-4 transition hover:border-white/[0.12]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8F8A84]">
                Net Retained Capital
              </span>
              <span className="h-2 w-2 rounded-full bg-[#C9733D]" />
            </div>
            <p className="mt-2 text-xl font-bold text-[#F5F5F5]">
              ₦{netRetained.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#141311] p-6 shadow-lg">
        <h3 className="text-sm font-semibold text-[#F5F5F5]">
          Spending Outflow Breakdown ({formatMonthLabel(selectedMonth)})
        </h3>

        {Object.keys(categoryBreakdown).length === 0 ? (
          <p className="mt-4 text-xs text-[#8F8A84]">
            No debit transactions logged for this month.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(categoryBreakdown).map(([category, amount]) => (
              <div
                key={category}
                className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#181715] p-3 text-xs"
              >
                <span className="text-[#8F8A84] capitalize">{category}</span>
                <span className="font-semibold text-rose-400">
                  -₦{amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
