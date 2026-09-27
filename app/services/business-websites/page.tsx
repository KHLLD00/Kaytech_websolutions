import ServiceLandingPage from "@/components/services/ServiceLandingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Business Website Design in Nigeria | Kaytech",
  description: "Professional business website design and development for companies and organizations in Abuja and across Nigeria.",
  path: "/services/business-websites",
});

export default function BusinessWebsitesPage() {
  return (
    <ServiceLandingPage
      eyebrow="BUSINESS WEBSITES"
      heading="Professional business website design for Nigerian companies."
      intro="Build a clear, credible website that explains what your business offers and gives potential customers an easy way to get in touch."
      description="Kaytech business websites focus on the pages and functionality a company needs to present its services, establish trust and generate enquiries."
      benefits={[
        "Professional Home, About, Services and Contact pages",
        "Clear presentation of products or services",
        "Responsive design across mobile, tablet and desktop",
        "Contact and lead-capture forms where required",
        "Social links and business information",
        "SEO-ready page structure and metadata",
      ]}
      bestFor={[
        "Small and growing businesses",
        "Professional service companies",
        "Local and national Nigerian businesses",
        "Organizations that need a credible company website",
      ]}
      related={[
        { href: "/services/website-design-development", label: "Website Design & Development" },
        { href: "/pricing", label: "Website Pricing" },
        { href: "/quote", label: "Request a Quote" },
      ]}
    />
  );
}
