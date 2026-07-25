import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Xfeatures";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="max-w-[1800px] divide-amber-300">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
