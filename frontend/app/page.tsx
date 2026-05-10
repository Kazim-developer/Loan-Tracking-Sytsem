import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import CTA from "@/components/home/CTA";
import FAQs from "@/components/home/FAQs";
import ProductPreview from "@/components/home/ProductPreview";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <hr className="center-section text-[#ccc]" />
        <ProductPreview />
        <Features />
        <HowItWorks />
        <hr className="center-section text-[#ccc]" />
        <Pricing />
        <FAQs />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
