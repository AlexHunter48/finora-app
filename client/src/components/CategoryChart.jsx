import React, { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useTransactions } from "../context/TransactionsContext";

const CATEGORY_COLORS = {
  Subscriptions: "#C9733D",
  "Food & Dining": "#E28B51",
  Transport: "#A8A39B",
  Shopping: "#6E6962",
  "Bills & Utilities": "#D4A373",
  Transfers: "#807A73",
  Others: "#423E3A",
};

const FALLBACK_COLORS = [
  "#C9733D",
  "#E28B51",
  "#A8A39B",
  "#6E6962",
  "#D4A373",
  "#807A73",
  "#423E3A",
];

// Smart category fallback based on transaction title/narration
const detectCategory = (tx) => {
  const rawCategory =
    tx.category?.name || tx.category || tx.category_name || tx.subcategory;

  // If a valid non-generic category exists, format and use it
  if (
    typeof rawCategory === "string" &&
    rawCategory.trim() &&
    rawCategory.toLowerCase() !== "others" &&
    rawCategory.toLowerCase() !== "other" &&
    rawCategory.toLowerCase() !== "general"
  ) {
    return rawCategory
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // Fallback: Infer category from transaction narration/title keywords
  const text = (tx.narration || tx.title || tx.name || "").toLowerCase();

  if (
    text.includes("netflix") ||
    text.includes("spotify") ||
    text.includes("youtube") ||
    text.includes("sub") ||
    text.includes("apple") ||
    text.includes("dstv") ||
    text.includes("chatgpt") ||
    text.includes("prime")
  ) {
    return "Subscriptions";
  }

  if (
    text.includes("food") ||
    text.includes("chicken") ||
    text.includes("eatery") ||
    text.includes("restaurant") ||
    text.includes("domino") ||
    text.includes("bukka") ||
    text.includes("kitchen") ||
    text.includes("cafe")
  ) {
    return "Food & Dining";
  }

  if (
    text.includes("uber") ||
    text.includes("bolt") ||
    text.includes("ride") ||
    text.includes("fuel") ||
    text.includes("transport") ||
    text.includes("filling")
  ) {
    return "Transport";
  }

  if (
    text.includes("shop") ||
    text.includes("supermarket") ||
    text.includes("store") ||
    text.includes("mart") ||
    text.includes("amazon") ||
    text.includes("pos")
  ) {
    return "Shopping";
  }

  if (
    text.includes("airtime") ||
    text.includes("data") ||
    text.includes("mtn") ||
    text.includes("airtel") ||
    text.includes("glo") ||
    text.includes("utility") ||
    text.includes("electric")
  ) {
    return "Bills & Utilities";
  }

  if (text.includes("transfer") || text.includes("trf")) {
    return "Transfers";
  }

  return "Others";
};

export default function CategoryChart({ selectedMonth }) {
  const contextData = useTransactions();
  const transactions = contextData?.transactions || [];

  const activeMonth = useMemo(() => {
    const target = selectedMonth || contextData?.selectedMonth || new Date();
    return new Date(target);
  }, [selectedMonth, contextData?.selectedMonth]);

  const { categoryData, totalSpent } = useMemo(() => {
    const categoryTotals = {};
    let grandTotal = 0;

    const targetMonth = activeMonth.getMonth();
    const targetYear = activeMonth.getFullYear();

    transactions.forEach((tx) => {
      // 1. Only aggregate debits (outflows)
      const isDebit = tx.type?.toLowerCase() === "debit";
      if (!isDebit) return;

      // 2. Date filter
      const txDate = new Date(tx.date || tx.createdAt || tx.created_at);
      if (isNaN(txDate.getTime())) return;

      if (
        txDate.getMonth() !== targetMonth ||
        txDate.getFullYear() !== targetYear
      ) {
        return;
      }

      // 3. Convert kobo to Naira (/ 100)
      const rawAmount = Math.abs(Number(tx.amount) || 0) / 100;

      if (rawAmount > 0) {
        const cat = detectCategory(tx);
        categoryTotals[cat] = (categoryTotals[cat] || 0) + rawAmount;
        grandTotal += rawAmount;
      }
    });

    const parsedData = Object.entries(categoryTotals)
      .map(([name, amount], index) => {
        const percentage =
          grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0;

        const color =
          CATEGORY_COLORS[name] ||
          FALLBACK_COLORS[index % FALLBACK_COLORS.length];

        return {
          name,
          value: percentage,
          rawAmount: amount,
          amount: `₦${amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          color,
        };
      })
      .sort((a, b) => b.rawAmount - a.rawAmount);

    return {
      categoryData: parsedData,
      totalSpent: grandTotal,
    };
  }, [transactions, activeMonth]);

  const monthLabel = activeMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#141311] p-5 text-[#F5F5F5] shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#8F8A84]">Spending Breakdown</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[#F5F5F5]">
            Categories
          </h3>
        </div>
        <span className="rounded-full border border-white/[0.08] bg-[#1D1C1A] px-3 py-1 text-xs text-[#A8A39B]">
          {monthLabel}
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <div className="relative flex h-56 w-56 shrink-0 items-center justify-center sm:h-64 sm:w-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={
                  categoryData.length > 0
                    ? categoryData
                    : [{ value: 1, color: "#262522" }]
                }
                innerRadius={68}
                outerRadius={88}
                dataKey="value"
                stroke="none"
                paddingAngle={4}
                cornerRadius={5}
              >
                {categoryData.length > 0 ? (
                  categoryData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))
                ) : (
                  <Cell fill="#262522" />
                )}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute flex flex-col items-center justify-center text-center">
            <span className="text-xl font-semibold tracking-tight text-[#F5F5F5] sm:text-2xl">
              ₦
              {totalSpent.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="mt-0.5 text-xs font-medium text-[#8F8A84]">
              Total Spent
            </span>
          </div>
        </div>

        <div className="w-full space-y-2.5">
          {categoryData.length > 0 ? (
            categoryData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl border border-white/[0.03] bg-[#1A1917]/60 p-3 transition-colors hover:border-white/[0.08] hover:bg-[#1A1917]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="text-sm leading-none font-medium text-[#F5F5F5]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[11px] leading-none font-normal text-[#8F8A84]">
                      {item.value}% of total
                    </p>
                  </div>
                </div>

                <span className="text-sm font-semibold text-[#F5F5F5]">
                  {item.amount}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-[#8F8A84]">
              No spending recorded for this month.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
