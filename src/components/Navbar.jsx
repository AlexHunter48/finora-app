import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "./Button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`${isOpen ? "h-dvh bg-[#0F0E0D]/98" : ""} max-w- fixed top-0 z-50 h-16 w-full bg-[#0F0E0D] lg:h-16`}
    >
      <nav className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-4 py-4 text-sm text-gray-200 md:px-6 lg:gap-8 lg:text-base">
        <span className="text-2xl font-bold tracking-[0.15em] uppercase md:tracking-[0.2em] lg:tracking-[0.3em]">
          Finora
        </span>
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className="hidden items-center gap-8 px-6 md:space-x-4 lg:flex">
          <li className="whitespace-nowrap">
            {" "}
            <a href="#features">Features</a>{" "}
          </li>
          <li className="whitespace-nowrap">
            {" "}
            <a href="#how-it-works">How it works</a>{" "}
          </li>
          <li className="whitespace-nowrap">
            <a href="/">Pricing</a>
          </li>
          <li className="whitespace-nowrap">
            <a href="#login">Login</a>
          </li>

          <li className="whitespace-nowrap">
            <Button>Get started </Button>
          </li>
        </ul>
      </nav>
      {isOpen && (
        <div className="flex flex-col gap-6 px-8 py-12 md:items-center md:text-center lg:hidden">
          <nav className="mt-5 flex flex-col gap-6 px-4">
            <ul className="md:text-md flex flex-col gap-6 space-y-9 text-lg font-medium text-gray-300 md:gap-10 md:text-2xl">
              <li>Features</li>
              <li>How it works</li>
              <li>Pricing</li>
              <li>Login</li>
            </ul>
          </nav>
          <div className="mt-8">
            <Button
              className={
                "rounded-md px-6 font-semibold md:px-12 md:py-4 md:text-2xl"
              }
            >
              {" "}
              Get started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
