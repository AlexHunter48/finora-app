import { Building2, Search, Bell } from "lucide-react";
import Button from "./Button";

const steps = [
  {
    icon: <Building2 size={24} className="text-[#C4873A]" />,
    title: "Connect your bank",
    description:
      "Securely connect your bank in seconds. We can read your transaction data.",
  },
  {
    icon: <Search size={24} className="text-[#C4873A]" />,
    title: "We find your subscriptions",
    description:
      "We scan your transactions to detect and organize all your subscriptions.",
  },
  {
    icon: <Bell size={24} className="text-[#C4873A]" />,
    title: "Get alerts before you're charged",
    description:
      "We notify you before renewals so you're always in control of your money.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="border-t border-gray-800 bg-[#0F0E0D] py-11 lg:px-10"
      id="how-it-works"
    >
      <div className="flex flex-col items-center justify-center">
        <h3 className="lg:text-md mb-5 text-sm text-orange-400">
          GET STARTED IN 3 SIMPLE STEPS
        </h3>
        <p className="mb-7 text-3xl text-gray-300 lg:text-4xl">
          It's easy to get started
        </p>
      </div>
      <div className="mb-5 grid-cols-3 divide-y divide-white/10 md:grid lg:divide-x lg:divide-y-0">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-6 px-6 py-8">
            <div className="shrink-0 rounded-full border border-[#C4873A] p-3">
              {step.icon}
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-col items-center justify-center">
        <Button
          className={
            "mb-9 hidden w-fit px-3 py-2 text-xl font-semibold capitalize lg:font-bold lg:text-zinc-950"
          }
        >
          Start Tracking
        </Button>
      </div>
    </section>
  );
}
