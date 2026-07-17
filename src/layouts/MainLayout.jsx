import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function MainLayout() {
  return (
    <div className="max-w-[1800px]">
      <Navbar />
      <Hero />
    </div>
  );
}
