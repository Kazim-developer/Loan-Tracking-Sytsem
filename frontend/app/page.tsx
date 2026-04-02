import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <section>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <hr className="center-section text-[#ccc]" />
        <Pricing />
      </main>
      <Footer />
    </section>
  );
}
