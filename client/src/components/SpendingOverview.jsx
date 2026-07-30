import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTransactions } from "../context/TransactionsContext";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#1A1917]/90 px-3 py-2 shadow-2xl backdrop-blur-md">
        <p className="text-[11px] font-medium text-[#8F8A84]">{label}</p>
        <p className="text-sm font-semibold text-[#F5F5F5]">
          ₦
          {payload[0].value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    );
  }
  return null;
};

export default function SpendingOverview({ selectedMonth }) {
  // Pull transactions (and optional context selectedMonth)
  const contextData = useTransactions();
  const transactions = contextData?.transactions || [];

  // Use prop if passed, fallback to context state, fallback to current Date
  const activeMonth = useMemo(() => {
    const target = selectedMonth || contextData?.selectedMonth || new Date();
    return new Date(target);
  }, [selectedMonth, contextData?.selectedMonth]);

  const chartData = useMemo(() => {
    const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dayTotals = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const targetMonth = activeMonth.getMonth();
    const targetYear = activeMonth.getFullYear();

    transactions.forEach((tx) => {
      // 1. Only aggregate debits (outflow)
      const isDebit = tx.type?.toLowerCase() === "debit";
      if (!isDebit) return;

      // 2. Date filtering: Check if transaction belongs to selected Month & Year
      const txDate = new Date(tx.date || tx.createdAt || tx.created_at);
      if (isNaN(txDate.getTime())) return;

      if (
        txDate.getMonth() !== targetMonth ||
        txDate.getFullYear() !== targetYear
      ) {
        return; // Skip transactions outside the selected month
      }

      // 3. Convert kobo to Naira (/ 100)
      const rawAmount = Math.abs(Number(tx.amount) || 0) / 100;
      if (rawAmount > 0) {
        const day = dayNames[txDate.getDay()];
        if (dayTotals[day] !== undefined) {
          dayTotals[day] += rawAmount;
        }
      }
    });

    return daysOrder.map((day) => ({
      day,
      amount: dayTotals[day],
    }));
  }, [transactions, activeMonth]);

  const totalSpent = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.amount, 0),
    [chartData],
  );

  const highestDay = useMemo(
    () =>
      chartData.reduce(
        (max, curr) => (curr.amount > max.amount ? curr : max),
        chartData[0] || { day: "N/A", amount: 0 },
      ),
    [chartData],
  );

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#141311] p-5 shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-xs text-[#8F8A84]">Spending Trend</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[#F5F5F5]">
            Weekly Overview
          </h3>
        </div>

        <span className="rounded-full border border-[#C9733D]/20 bg-[#C9733D]/10 px-3 py-1 text-xs font-semibold text-[#C9733D]">
          Outflow
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9733D" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#C9733D" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.04)"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#8F8A84", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />

            <YAxis
              tick={{ fill: "#8F8A84", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => {
                if (val >= 1000000) return `₦${(val / 1000000).toFixed(1)}M`;
                if (val >= 1000) return `₦${(val / 1000).toFixed(0)}k`;
                return `₦${val}`;
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "rgba(201, 115, 61, 0.3)",
                strokeWidth: 1.5,
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#C9733D"
              strokeWidth={3}
              fill="url(#spendingGradient)"
              dot={false}
              activeDot={{
                r: 6,
                fill: "#F5F5F5",
                stroke: "#C9733D",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <div>
          <p className="text-xs text-[#8F8A84]">Highest Spending Day</p>
          <h4 className="mt-0.5 text-lg font-semibold text-[#F5F5F5]">
            {highestDay.amount > 0 ? highestDay.day : "N/A"}
          </h4>
        </div>

        <div className="text-right">
          <p className="text-xs text-[#8F8A84]">Total Outflow</p>
          <h4 className="mt-0.5 text-lg font-semibold text-[#C9733D]">
            ₦
            {totalSpent.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h4>
        </div>
      </div>
    </div>
  );
}
