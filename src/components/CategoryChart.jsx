import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Subscriptions",
    value: 35,
    amount: "₦24,000",
    color: "#C9733D",
  },
  {
    name: "Food & Dining",
    value: 25,
    amount: "₦17,000",
    color: "#E28B51",
  },
  {
    name: "Transport",
    value: 18,
    amount: "₦12,400",
    color: "#A8A39B",
  },
  {
    name: "Shopping",
    value: 12,
    amount: "₦8,200",
    color: "#6E6962",
  },
  {
    name: "Others",
    value: 10,
    amount: "₦6,850",
    color: "#423E3A",
  },
];

export default function CategoryChart() {
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
          This Month
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <div className="relative flex h-56 w-56 shrink-0 items-center justify-center sm:h-64 sm:w-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={68}
                outerRadius={88}
                dataKey="value"
                stroke="none"
                paddingAngle={4}
                cornerRadius={5}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-semibold tracking-tight text-[#F5F5F5]">
              ₦68,450
            </span>
            <span className="mt-0.5 text-xs font-medium text-[#8F8A84]">
              Total Spent
            </span>
          </div>
        </div>

        <div className="w-full space-y-2.5">
          {data.map((item) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
