import ServiceLandingPage from "@/components/services/ServiceLandingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "E-commerce Website Design in Nigeria | Kaytech",
  description: "E-commerce website design for Nigerian businesses that want to present products online and support a clear path to purchase.",
  path: "/services/ecommerce",
});

export default function EcommercePage() {
  return (
    <ServiceLandingPage
      eyebrow="E-COMMERCE DESIGN"
      heading="E-commerce website design for Nigerian businesses."
      intro="Design an online store that presents products clearly and gives customers a straightforward journey from browsing to purchase."
      description="Kaytech e-commerce design projects can cover product presentation, store structure and cart and checkout experiences."
      benefits={[
        "Product listing and product detail experiences",
        "Responsive shopping experience across devices",
        "Cart and checkout design",
        "Clear product and category organization",
        "Clear store and category page layouts",
        "Consistent product page templates",
      ]}
      bestFor={[
        "Retail businesses moving products online",
        "Existing stores that need a dedicated e-commerce website",
        "Businesses launching a new online store",
        "Brands that need a clearer product browsing experience",
      ]}
      related={[
        { href: "/services/website-design", label: "Website Design" },
        { href: "/services/custom-website-design", label: "Custom Website Design" },
        { href: "/pricing", label: "Website Pricing" },
      ]}
    />
  );
}
