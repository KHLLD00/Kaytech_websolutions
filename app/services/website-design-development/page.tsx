import ServiceLandingPage from "@/components/services/ServiceLandingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Website Design & Development in Nigeria | Kaytech",
  description: "Professional website design and development for businesses in Abuja and across Nigeria, with responsive design, clear UX and practical functionality.",
  path: "/services/website-design-development",
});

export default function WebsiteDesignDevelopmentPage() {
  return (
    <ServiceLandingPage
      eyebrow="WEBSITE DESIGN & DEVELOPMENT"
      heading="Professional website design and development in Nigeria."
      intro="Kaytech designs and develops responsive websites that give businesses a clear, credible online presence and make it easier for visitors to take action."
      description="This service covers the design and development of a modern business website around your goals, audience, content and required functionality."
      benefits={[
        "Custom website design suited to your business and brand",
        "Responsive layouts for desktop, tablet and mobile",
        "Clear page structure and user journeys",
        "Maintainable website development and practical functionality",
        "Basic or enhanced SEO foundations depending on scope",
        "Deployment support from build through launch",
      ]}
      bestFor={[
        "Businesses creating a new website",
        "Companies replacing an outdated website",
        "Organizations that need a stronger online presence",
        "Businesses that need design and development handled together",
      ]}
      related={[
        { href: "/services/business-websites", label: "Business Websites" },
        { href: "/services/ecommerce", label: "E-commerce Development" },
        { href: "/services/custom-web-development", label: "Custom Web Development" },
      ]}
    />
  );
}
