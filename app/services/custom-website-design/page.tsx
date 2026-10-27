import ServiceLandingPage from "@/components/services/ServiceLandingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Custom Website Design in Nigeria | Kaytech",
  description: "Custom website design and user experience for businesses in Nigeria that need more than a standard template.",
  path: "/services/custom-website-design",
});

export default function CustomWebsiteDesignPage() {
  return (
    <ServiceLandingPage
      eyebrow="CUSTOM WEBSITE DESIGN"
      heading="Custom website design for business-specific requirements."
      intro="When a standard business website is not enough, Kaytech can design a tailored experience around your actual workflow, brand and audience."
      description="Custom website design is scoped around the layouts, user journeys and page structures your project needs rather than forcing it into a standard package."
      benefits={[
        "Layouts and page structures scoped to your requirements",
        "Business-specific user journeys and experiences",
        "Tailored visual identity and design direction",
        "Custom page structures for more complex content",
        "Responsive interfaces across devices",
        "Design support for evolving requirements",
      ]}
      bestFor={[
        "Businesses with requirements beyond standard websites",
        "Teams that need custom layouts and user journeys",
        "Projects requiring a tailored web experience",
        "Businesses planning a more advanced web presence",
      ]}
      related={[
        { href: "/services/website-design", label: "Website Design" },
        { href: "/services/ecommerce", label: "E-commerce Design" },
        { href: "/quote", label: "Discuss Your Requirements" },
      ]}
    />
  );
}
