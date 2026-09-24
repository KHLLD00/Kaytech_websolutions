import type { Metadata } from "next";
import PricingSection from "@/components/sections/PricingSection";
import AddOnsSection from "@/components/sections/AddOnsSection";

export const metadata: Metadata = {
  title: "Pricing — Kaytech Web Solutions",
  description:
    "Explore website packages and straightforward pricing for businesses looking for a professional online presence.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <main>
      <PricingSection headingLevel="h1" />
      <AddOnsSection />
    </main>
  );
}
