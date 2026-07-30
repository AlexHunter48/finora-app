import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Laptop,
  ShieldCheck,
  Plane,
  ChevronRight,
  X,
  Trash2,
  Car,
  Home,
  Briefcase,
  PlusCircle,
} from "lucide-react";

const ICON_OPTIONS = [
  {
    name: "Safety",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    name: "Tech",
    icon: Laptop,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    name: "Travel",
    icon: Plane,
    color: "text-[#C9733D]",
    bg: "bg-[#C9733D]/10 border-[#C9733D]/20",
  },
  {
    name: "Auto",
    icon: Car,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    name: "Home",
    icon: Home,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    name: "Work",
    icon: Briefcase,
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
];

const initialGoals = [
  {
    id: "g1",
    title: "Emergency Fund",
    target: 1000000,
    saved: 650000,
    category: "Safety Net",
    dueDate: "Dec 2026",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "g2",
    title: "M3 Macbook Pro Upgrade",
    target: 1800000,
    saved: 1200000,
    category: "Work Tools",
    dueDate: "Oct 2026",
    icon: Laptop,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    id: "g3",
    title: "End of Year Retreat",
    target: 500000,
    saved: 150000,
    category: "Travel",
    dueDate: "Nov 2026",
    icon: Plane,
    color: "text-[#C9733D]",
    bg: "bg-[#C9733D]/10 border-[#C9733D]/20",
  },
];

export default function Goals() {
  const navigate = useNavigate();

  const [goals, setGoals] = useState(initialGoals);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeGoalForFunds, setActiveGoalForFunds] = useState(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("0");
  const [dueDate, setDueDate] = useState("");
  const [selectedIconIdx, setSelectedIconIdx] = useState(0);

  const [fundAmount, setFundAmount] = useState("");

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!title || !target || !category) return;

    const selectedPreset = ICON_OPTIONS[selectedIconIdx];

    const newGoal = {
      id: `g-${Date.now()}`,
      title,
      category,
      target: Number(target),
      saved: Number(saved) || 0,
      dueDate: dueDate || "TBD",
      icon: selectedPreset.icon,
      color: selectedPreset.color,
      bg: selectedPreset.bg,
    };

    setGoals((prev) => [newGoal, ...prev]);

    setTitle("");
    setCategory("");
    setTarget("");
    setSaved("0");
    setDueDate("");
    setSelectedIconIdx(0);
    setIsCreateModalOpen(false);
  };

  const handleAddFunds = (e) => {
    e.preventDefault();
    if (!fundAmount || !activeGoalForFunds) return;

    const amountToAdd = Number(fundAmount);

    setGoals((prev) =>
      prev.map((g) =>
        g.id === activeGoalForFunds.id
          ? { ...g, saved: g.saved + amountToAdd }
          : g,
      ),
    );

    setFundAmount("");
    setActiveGoalForFunds(null);
  };

  const handleDelete = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
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
              Savings Targets
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
              Financial Goals
            </h1>
          </div>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9733D] to-[#D87F46] px-5 py-3 text-xs font-semibold text-white shadow-[0_4px_20px_rgba(201,115,61,0.25)] transition hover:opacity-95"
        >
          <Plus size={16} />
          <span>Create New Goal</span>
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const percent =
            goal.target > 0 ? Math.round((goal.saved / goal.target) * 100) : 0;

          return (
            <div
              key={goal.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141311] p-6 shadow-lg transition hover:border-white/[0.15]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border ${goal.bg}`}
                  >
                    <Icon className={`h-6 w-6 ${goal.color}`} />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/[0.08] bg-[#1D1C1A] px-3 py-1 text-[11px] font-medium text-[#8F8A84]">
                      Target: {goal.dueDate}
                    </span>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="text-[#8F8A84] opacity-0 transition group-hover:opacity-100 hover:text-rose-400"
                      title="Delete Goal"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#F5F5F5]">
                  {goal.title}
                </h3>
                <p className="text-xs text-[#8F8A84]">{goal.category}</p>

                <div className="mt-6 flex items-baseline justify-between">
                  <div>
                    <p className="text-xs text-[#8F8A84]">Saved so far</p>
                    <p className="text-xl font-bold text-[#F5F5F5]">
                      ₦{goal.saved.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#8F8A84]">Target</p>
                    <p className="text-xs font-semibold text-[#8F8A84]">
                      ₦{goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#C9733D] to-[#D87F46] transition-all duration-300"
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <span className="text-xs font-semibold text-emerald-400">
                  {percent}% Completed
                </span>
                <button
                  onClick={() => setActiveGoalForFunds(goal)}
                  className="flex items-center gap-1 text-xs font-medium text-[#C9733D] transition hover:underline"
                >
                  <span>Add Funds</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#141311] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h2 className="text-lg font-bold text-[#F5F5F5]">
                Create Financial Goal
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-lg p-1 text-[#8F8A84] hover:text-[#F5F5F5]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#8F8A84]">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New Apartment Deposit"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-3.5 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#C9733D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#8F8A84]">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Real Estate"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-3.5 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#C9733D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8F8A84]">
                    Target Date
                  </label>
                  <input
                    type="text"
                    placeholder="Dec 2026"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-3.5 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#C9733D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#8F8A84]">
                    Target Amount (₦)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="500000"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-3.5 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#C9733D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8F8A84]">
                    Initial Saved (₦)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={saved}
                    onChange={(e) => setSaved(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-3.5 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#C9733D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8F8A84]">
                  Select Icon Theme
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {ICON_OPTIONS.map((item, idx) => {
                    const IconComp = item.icon;
                    const isSelected = selectedIconIdx === idx;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setSelectedIconIdx(idx)}
                        className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs transition ${
                          isSelected
                            ? "border-[#C9733D] bg-[#C9733D]/10 text-[#C9733D]"
                            : "border-white/[0.08] bg-[#1D1C1A] text-[#8F8A84] hover:text-[#F5F5F5]"
                        }`}
                      >
                        <IconComp size={16} className={item.color} />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-xl border border-white/[0.08] px-4 py-2.5 text-xs font-semibold text-[#8F8A84] hover:text-[#F5F5F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#C9733D] px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#d87f46]"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeGoalForFunds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-white/[0.1] bg-[#141311] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2">
                <PlusCircle className="text-[#C9733D]" size={20} />
                <h2 className="text-base font-bold text-[#F5F5F5]">
                  Deposit Funds
                </h2>
              </div>
              <button
                onClick={() => setActiveGoalForFunds(null)}
                className="rounded-lg p-1 text-[#8F8A84] hover:text-[#F5F5F5]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddFunds} className="mt-4 space-y-4">
              <div>
                <p className="text-xs text-[#8F8A84]">Adding funds to:</p>
                <p className="text-sm font-semibold text-[#F5F5F5]">
                  {activeGoalForFunds.title}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8F8A84]">
                  Amount to Add (₦)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  autoFocus
                  placeholder="50000"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/[0.08] bg-[#1D1C1A] px-3.5 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#C9733D]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveGoalForFunds(null)}
                  className="rounded-xl border border-white/[0.08] px-4 py-2.5 text-xs font-semibold text-[#8F8A84] hover:text-[#F5F5F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#C9733D] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#d87f46]"
                >
                  Confirm Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
