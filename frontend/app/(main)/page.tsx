import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import CTA from "@/components/home/CTA";
import FAQs from "@/components/home/FAQs";
import ProductPreview from "@/components/home/ProductPreview";

export default function HomePage() {
  return (
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
  );
}
