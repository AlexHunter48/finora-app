import dashboardBg from "../assets/dashboard-preview.png";
import { CircleCheck, ArrowRight } from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Features() {
  return (
    <section
      className="bg-[] flex flex-col items-center justify-center bg-[#0F0E0D] px-10 py-18 pl-10 md:py-15 lg:flex-row lg:gap-5 lg:space-x-5 lg:px-18 lg:py-9 lg:pt-20"
      id="features"
    >
      {" "}
      <div className="space-y-3">
        {" "}
        <p className="lg:text-md mb-3 text-xs text-amber-500">
          ALL YOUR FINANCES. ONE PLACE.
        </p>{" "}
        <h2 className="mb-4 text-4xl text-gray-300 lg:mb-6 lg:text-5xl">
          {" "}
          See everything. <br className="= lg:block" />
          <p className="lg:mt-3">Stay in control.</p>
        </h2>
        <p className="text-md text-gray-300 lg:text-lg">
          Stay on top of recurring expenses with a clear view of subscriptions,
          upcoming renewals ,and spending patterns so you can make smarter
          financial decisions every month
        </p>{" "}
        <ul className="lg:text-md mt-5 space-y-4 text-sm">
          <li className="flex gap-5">
            <span>
              <CircleCheck className="h-5 w-5 text-orange-400" />
            </span>
            <span className="text-gray-300">Never miss a renewal date</span>
          </li>
          <li className="flex gap-5">
            <span>
              {" "}
              <CircleCheck className="h-5 w-5 text-[#b37d3e]" />
            </span>
            <span className="text-gray-300">
              Understand your recurring spending
            </span>
          </li>
          <li className="flex gap-5">
            <span>
              {" "}
              <CircleCheck className="h-5 w-5 text-[#b37d3e]" />
            </span>
            <span className="text-gray-300">
              Spot opportunities to save money
            </span>
          </li>
          <li className="flex gap-5">
            <span>
              {" "}
              <CircleCheck className="h-5 w-5 text-[#b37d3e]" />
            </span>
            <span className="text-gray-300">
              Get personalized financial insights
            </span>
          </li>
        </ul>
        <NavLink
          to="/features"
          className="text-xm lg:text-md mt-8 inline-flex items-center gap-2 font-medium text-orange-400 hover:text-orange-300"
        >
          {" "}
          Explore all features <ArrowRight size={16} />{" "}
        </NavLink>
      </div>{" "}
      <div className="mt-8 self-start pt-20 lg:mx-12">
        <img
          src={dashboardBg}
          alt="Finora dashboard preview"
          className="self-start rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
}
