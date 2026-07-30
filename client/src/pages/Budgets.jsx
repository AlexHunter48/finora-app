import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Target,
  AlertTriangle,
  CreditCard,
  Utensils,
  Zap,
  ShoppingBag,
  Code2,
  X,
  Trash2,
  Wallet,
  Car,
  Heart,
} from "lucide-react";

const ICON_OPTIONS = [
  { name: "Subscriptions", icon: CreditCard },
  { name: "Food", icon: Utensils },
  { name: "Development", icon: Code2 },
  { name: "Utilities", icon: Zap },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Transport", icon: Car },
  { name: "Health", icon: Heart },
  { name: "General", icon: Wallet },
];

const initialBudgets = [
  {
    id: "b1",
    category: "Subscriptions & Recurring",
    spent: 103000,
    limit: 110000,
    icon: CreditCard,
    badge: "bg-[#C9733D]/10 text-[#C9733D] border-[#C9733D]/20",
    color: "bg-[#C9733D]",
  },
  {
    id: "b2",
    category: "Food & Dining",
    spent: 28000,
    limit: 30000,
    icon: Utensils,
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    color: "bg-emerald-500",
  },
  {
    id: "b3",
    category: "Development & SaaS",
    spent: 61000,
    limit: 50000,
    icon: Code2,
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    color: "bg-purple-500",
  },
  {
    id: "b4",
    category: "Utilities & Power",
    spent: 38000,
    limit: 45000,
    icon: Zap,
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    color: "bg-amber-500",
  },
  {
    id: "b5",
    category: "Shopping & Lifestyle",
    spent: 15000,
    limit: 40000,
    icon: ShoppingBag,
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    color: "bg-blue-500",
  },
];

export default function Budgets() {
  const navigate = useNavigate();

  const [budgets, setBudgets] = useState(initialBudgets);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newCategory, setNewCategory] = useState("");
  const [newLimit, setNewLimit] = useState("");
  const [newSpent, setNewSpent] = useState("0");
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);

  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const totalLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
  const overallPercentage =
    totalLimit > 0 ? Math.round((totalSpent / totalLimit) * 100) : 0;

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!newCategory || !newLimit) return;

    const SelectedIcon = ICON_OPTIONS[selectedIconIndex].icon;

    const newBudgetItem = {
      id: `b-${Date.now()}`,
      category: newCategory,
      spent: Number(newSpent) || 0,
      limit: Number(newLimit),
      icon: SelectedIcon,
      color: "bg-[#C9733D]",
      badge: "bg-[#C9733D]/10 text-[#C9733D] border-[#C9733D]/20",
    };

    setBudgets((prev) => [newBudgetItem, ...prev]);

    setNewCategory("");
    setNewLimit("");
    setNewSpent("0");
    setSelectedIconIndex(0);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };

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
              Spending Controls
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
              Monthly Budgets
            </h1>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9733D] to-[#D87F46] px-5 py-3 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(201,115,61,0.25)] transition hover:opacity-95"
        >
          <Plus size={16} />
          <span>Set Category Budget</span>
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#141311] p-5 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-[#8F8A84]">
              Overall Budget Capacity
            </p>
            <p className="mt-1 text-2xl font-bold text-[#F5F5F5]">
              ₦{totalSpent.toLocaleString()}{" "}
              <span className="text-sm font-normal text-[#8F8A84]">
                / ₦{totalLimit.toLocaleString()}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-4 py-2.5 text-xs">
            <Target size={16} className="text-[#C9733D]" />
            <span className="text-[#8F8A84]">
              Overall Utilized:{" "}
              <strong className="text-[#F5F5F5]">{overallPercentage}%</strong>
            </span>
          </div>
        </div>

        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-[#C9733D] transition-all duration-300"
            style={{ width: `${Math.min(overallPercentage, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((b) => {
          const Icon = b.icon;
          const percent =
            b.limit > 0 ? Math.round((b.spent / b.limit) * 100) : 0;
          const isOver = b.spent > b.limit;
          const isWarning = percent >= 85 && !isOver;

          return (
            <div
              key={b.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141311] p-5 shadow-lg transition hover:border-white/[0.15]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${b.badge}`}
                    >
                      <Icon size={18} />
                    </div>
                    <h3 className="text-sm font-semibold text-[#F5F5F5]">
                      {b.category}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold ${
                        isOver
                          ? "text-rose-400"
                          : isWarning
                            ? "text-amber-400"
                            : "text-[#8F8A84]"
                      }`}
                    >
                      {percent}%
                    </span>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="text-[#8F8A84] opacity-0 transition group-hover:opacity-100 hover:text-rose-400"
                      title="Delete Budget"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {isOver && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-[11px] font-medium text-rose-400">
                    <AlertTriangle size={14} />
                    <span>
                      Exceeded budget limit by ₦
                      {(b.spent - b.limit).toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="mt-4 flex items-baseline justify-between text-xs">
                  <span className="text-[#8F8A84]">
                    Spent:{" "}
                    <strong className="text-[#F5F5F5]">
                      ₦{b.spent.toLocaleString()}
                    </strong>
                  </span>
                  <span className="text-[#8F8A84]">
                    Limit: ₦{b.limit.toLocaleString()}
                  </span>
                </div>

                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isOver
                        ? "bg-rose-500"
                        : isWarning
                          ? "bg-amber-500"
                          : b.color || "bg-[#C9733D]"
                    }`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 border-t border-white/[0.06] pt-3 text-right text-[11px] text-[#8F8A84]">
                {isOver ? (
                  <span className="text-rose-400">Action recommended</span>
                ) : (
                  <span>
                    ₦{(b.limit - b.spent).toLocaleString()} remaining capacity
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#141311] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h2 className="text-lg font-bold text-[#F5F5F5]">
                Set New Category Budget
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-[#8F8A84] hover:text-[#F5F5F5]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddBudget} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#8F8A84]">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Entertainment & Gaming"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-3.5 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#C9733D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#8F8A84]">
                    Monthly Limit (₦)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="50000"
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-3.5 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#C9733D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8F8A84]">
                    Initial Spent (₦)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={newSpent}
                    onChange={(e) => setNewSpent(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-3.5 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#C9733D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8F8A84]">
                  Choose Icon
                </label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {ICON_OPTIONS.map((item, idx) => {
                    const IconComp = item.icon;
                    const isSelected = selectedIconIndex === idx;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setSelectedIconIndex(idx)}
                        className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs transition ${
                          isSelected
                            ? "border-[#C9733D] bg-[#C9733D]/10 text-[#C9733D]"
                            : "border-white/[0.08] bg-[#1D1C1A] text-[#8F8A84] hover:text-[#F5F5F5]"
                        }`}
                      >
                        <IconComp size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-white/[0.08] px-4 py-2.5 text-xs font-semibold text-[#8F8A84] hover:text-[#F5F5F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#C9733D] px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#d87f46]"
                >
                  Save Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
