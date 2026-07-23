import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  FileText,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  PieChart,
} from "lucide-react";

export default function Reports() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F0E0D] px-4 py-6 pb-28 text-[#F5F5F5] sm:px-8 lg:px-10 lg:pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              Financial Statements
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
              Monthly Reports
            </h1>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9733D] to-[#D87F46] px-5 py-3 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(201,115,61,0.25)]">
          <Download size={16} />
          <span>Export Full PDF Report</span>
        </button>
      </div>

      {/* Summary Statements Card */}
      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#141311] p-6 shadow-lg">
        <h2 className="text-base font-semibold text-[#F5F5F5]">
          July 2026 Executive Summary
        </h2>
        <p className="text-xs text-[#8F8A84]">
          Net income vs. total operating expenses
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/[0.06] bg-[#181715] p-4">
            <span className="text-xs text-[#8F8A84]">Gross Income</span>
            <p className="mt-2 text-xl font-bold text-emerald-400">+₦500,000</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[#181715] p-4">
            <span className="text-xs text-[#8F8A84]">Total Outflow</span>
            <p className="mt-2 text-xl font-bold text-rose-400">-₦245,000</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[#181715] p-4">
            <span className="text-xs text-[#8F8A84]">Net Retained Capital</span>
            <p className="mt-2 text-xl font-bold text-[#F5F5F5]">₦255,000</p>
          </div>
        </div>
      </div>

      {/* Downloadable Statements Feed */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-[#F5F5F5]">
          Generated Statements
        </h3>
        <div className="mt-4 flex flex-col gap-3">
          {[
            { month: "June 2026 Report", size: "1.2 MB", date: "Jul 01, 2026" },
            { month: "May 2026 Report", size: "1.4 MB", date: "Jun 01, 2026" },
            {
              month: "April 2026 Report",
              size: "1.1 MB",
              date: "May 01, 2026",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#141311] p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C9733D]/20 bg-[#C9733D]/10 text-[#C9733D]">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#F5F5F5]">
                    {item.month}
                  </p>
                  <p className="text-[11px] text-[#8F8A84]">
                    Generated on {item.date} • {item.size}
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#1D1C1A] px-3 py-1.5 text-xs text-[#8F8A84] hover:text-[#F5F5F5]">
                <Download size={14} />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
