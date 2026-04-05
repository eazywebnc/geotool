import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";
import { AnimatedMeshBg } from "@/components/landing/animated-bg";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030508]">
      <AnimatedMeshBg />
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}
