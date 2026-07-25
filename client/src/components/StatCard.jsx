export default function StatCard({
  title,
  value,
  change,
  changeType,
  subtitle,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-white/[0.04] bg-[#1D1B19] p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-[#A8A39B]">{title}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C96F35]/10 text-[#C96F35]">
          {icon}
        </div>
      </div>

      <div className="mb-1 text-2xl font-bold text-[#F5F5F4]">{value}</div>

      {change && (
        <div
          className={`mt-2 text-xs font-medium ${
            changeType === "positive"
              ? "text-[#3FA66B]"
              : changeType === "negative"
                ? "text-[#C96F35]"
                : "text-[#A8A39B]"
          }`}
        >
          {change}
        </div>
      )}

      {subtitle && (
        <div className="mt-2 text-xs text-[#6D6A66]">{subtitle}</div>
      )}
    </div>
  );
}
