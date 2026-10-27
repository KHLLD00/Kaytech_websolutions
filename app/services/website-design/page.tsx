import ServiceLandingPage from "@/components/services/ServiceLandingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Website Design in Nigeria | Kaytech",
  description: "Professional website design for businesses in Abuja and across Nigeria, with responsive layouts, clear UX and a strong visual identity.",
  path: "/services/website-design",
});

export default function WebsiteDesignPage() {
  return (
    <ServiceLandingPage
      eyebrow="WEBSITE DESIGN"
      heading="Professional website design in Nigeria."
      intro="Kaytech designs responsive websites that give businesses a clear, credible online presence and make it easier for visitors to take action."
      description="This service covers the design of a modern business website around your goals, audience, content and brand."
      benefits={[
        "Custom website design suited to your business and brand",
        "Responsive layouts for desktop, tablet and mobile",
        "Clear page structure and user journeys",
        "Consistent typography, colour and visual hierarchy",
        "Design that supports SEO foundations, depending on scope",
        "Design support from first concept through launch",
      ]}
      bestFor={[
        "Businesses creating a new website",
        "Companies replacing an outdated website",
        "Organizations that need a stronger online presence",
        "Businesses that want a clear, purposeful design",
      ]}
      related={[
        { href: "/services/business-websites", label: "Business Websites" },
        { href: "/services/ecommerce", label: "E-commerce Design" },
        { href: "/services/custom-website-design", label: "Custom Website Design" },
      ]}
    />
  );
}
