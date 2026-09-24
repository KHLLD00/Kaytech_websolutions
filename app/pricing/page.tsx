import type { Metadata } from "next";
import PricingSection from "@/components/sections/PricingSection";
import AddOnsSection from "@/components/sections/AddOnsSection";

export const metadata: Metadata = {
  title: "Pricing — Kaytech Web Solutions",
  description: "Simple, transparent pricing for websites of every size.",
};

export default function PricingPage() {
  return (
    <main>
      <PricingSection headingLevel="h1" />
      <AddOnsSection />
    </main>
  );
}
