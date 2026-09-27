import PricingSection from "@/components/sections/PricingSection";
import AddOnsSection from "@/components/sections/AddOnsSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Website Design Pricing in Nigeria | Kaytech Web Solutions",
  description: "View Kaytech Web Solutions website packages and pricing for businesses looking for a professional online presence in Nigeria.",
  path: "/pricing",
});

export default function PricingPage() {
  return <main><PricingSection headingLevel="h1" /><AddOnsSection /></main>;
}
