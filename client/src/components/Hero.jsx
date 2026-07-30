import { useNavigate } from "react-router-dom";
import heroBg from "../assets/hero-bg.png";
import Button from "./Button";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section
      className="relative mt-16 min-h-screen w-full max-w-[1800px] bg-cover bg-[77%_center] bg-no-repeat md:bg-[88%_center] lg:bg-[90%_center]"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 hidden bg-gradient-to-b from-[#121212] via-[#121212]/50 to-transparent"></div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-7xl flex-col justify-start px-6 pt-13 pb-8 lg:justify-start lg:px-5 lg:pt-30 lg:pb-0 xl:px-0">
        <div className="max-w-xl lg:px-6 xl:px-5">
          <h1 className="mb-4 space-y-3 text-3xl leading-tight font-bold tracking-wide text-white md:text-5xl lg:text-5xl">
            Your money.
            <br />{" "}
            <span className="text-[#b37d3e]">
              Finally <br /> accounted for.
            </span>
          </h1>

          <p className="text-md mb-6 leading-relaxed text-gray-300 md:mt-10 md:mb-19 md:text-lg">
            Track subscriptions, manage expenses, and never be caught off guard
            by unexpected renewals.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="hidden rounded-full bg-[#b37d3e] px-8 py-4 text-lg font-bold text-zinc-950 transition-all duration-200 hover:bg-[#c98d46] md:block"
              onClick={() => navigate("/Sign-up")}
            >
              Get started for free
            </Button>

            <a
              href="#how-it-works"
              className="inline-block w-fit rounded-full border border-gray-500 px-4 py-3 text-center text-base font-bold text-white transition-all duration-200 hover:bg-white/10 md:block lg:px-8 lg:py-4 lg:text-lg"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="mt-auto flex w-full items-center justify-center pt-10 md:hidden">
          <Button className="w-fit rounded-full bg-[#b37d3e] py-4 text-base font-bold text-zinc-950 shadow-lg transition-all duration-200 hover:bg-[#c98d46]">
            Get started for free
          </Button>
        </div>
      </div>
    </section>
  );
}
