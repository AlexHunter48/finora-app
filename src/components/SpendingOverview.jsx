import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", amount: 24000 },
  { day: "Tue", amount: 32000 },
  { day: "Wed", amount: 28000 },
  { day: "Thu", amount: 46000 },
  { day: "Fri", amount: 40000 },
  { day: "Sat", amount: 56000 },
  { day: "Sun", amount: 52000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#1A1917]/90 px-3 py-2 shadow-2xl backdrop-blur-md">
        <p className="text-[11px] font-medium text-[#8F8A84]">{label}</p>
        <p className="text-sm font-semibold text-[#F5F5F5]">
          ₦{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function SpendingOverview() {
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
          +8.2%
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
              tickFormatter={(val) => `₦${val / 1000}k`}
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
          <p className="text-xs text-[#8F8A84]">Highest Spending</p>
          <h4 className="mt-0.5 text-lg font-semibold text-[#F5F5F5]">
            Saturday
          </h4>
        </div>

        <div className="text-right">
          <p className="text-xs text-[#8F8A84]">Total</p>
          <h4 className="mt-0.5 text-lg font-semibold text-[#C9733D]">
            ₦68,450
          </h4>
        </div>
      </div>
    </div>
  );
}
