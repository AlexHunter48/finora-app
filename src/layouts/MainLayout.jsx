import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Xfeatures";
import HowItWorks from "../components/HowItWorks";

export default function MainLayout() {
  return (
    <div className="max-w-[1800px] divide-amber-300">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
}
