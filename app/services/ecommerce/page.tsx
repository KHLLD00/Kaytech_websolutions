import ServiceLandingPage from "@/components/services/ServiceLandingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "E-commerce Website Development in Nigeria | Kaytech",
  description: "E-commerce website design and development for Nigerian businesses that want to present products online and support a clear path to purchase.",
  path: "/services/ecommerce",
});

export default function EcommercePage() {
  return (
    <ServiceLandingPage
      eyebrow="E-COMMERCE DEVELOPMENT"
      heading="E-commerce website development for Nigerian businesses."
      intro="Create an online store that presents products clearly and gives customers a straightforward journey from browsing to purchase."
      description="Kaytech e-commerce projects can cover product presentation, store structure, cart and checkout experiences, plus payment integration where required."
      benefits={[
        "Product listing and product detail experiences",
        "Responsive shopping experience across devices",
        "Cart and checkout flow",
        "Clear product and category organization",
        "Payment integration available as an add-on where applicable",
        "SEO-ready product and store page foundations",
      ]}
      bestFor={[
        "Retail businesses moving products online",
        "Existing stores that need a dedicated e-commerce website",
        "Businesses launching a new online store",
        "Brands that need a clearer product browsing experience",
      ]}
      related={[
        { href: "/services/website-design-development", label: "Website Design & Development" },
        { href: "/services/custom-web-development", label: "Custom Web Development" },
        { href: "/pricing", label: "Website Pricing" },
      ]}
    />
  );
}
