import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import WhyKaytechSection from "@/components/sections/WhyKaytechSection";
import PricingSection from "@/components/sections/PricingSection";
import AddOnsSection from "@/components/sections/AddOnsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ApproachSection from "@/components/sections/ApproachSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <WhyKaytechSection />
      <PricingSection />
      <AddOnsSection />
      <ProcessSection />
      <ApproachSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
}
