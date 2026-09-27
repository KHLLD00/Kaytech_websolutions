import ServiceLandingPage from "@/components/services/ServiceLandingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Custom Web Development in Nigeria | Kaytech",
  description: "Custom web development and web solutions for businesses in Nigeria that need functionality beyond a standard website.",
  path: "/services/custom-web-development",
});

export default function CustomWebDevelopmentPage() {
  return (
    <ServiceLandingPage
      eyebrow="CUSTOM WEB DEVELOPMENT"
      heading="Custom web development for business-specific requirements."
      intro="When a standard business website is not enough, Kaytech can build custom functionality and integrations around your actual workflow and requirements."
      description="Custom web development is scoped around the features, integrations and user journeys your project needs rather than forcing the project into a standard package."
      benefits={[
        "Custom features scoped to your requirements",
        "Business-specific workflows and user experiences",
        "Third-party integrations where applicable",
        "Custom page structures and functionality",
        "Responsive interfaces across devices",
        "Support for evolving requirements",
      ]}
      bestFor={[
        "Businesses with requirements beyond standard websites",
        "Teams that need custom forms, workflows or integrations",
        "Projects requiring a tailored web experience",
        "Businesses planning a more advanced web platform",
      ]}
      related={[
        { href: "/services/website-design-development", label: "Website Design & Development" },
        { href: "/services/ecommerce", label: "E-commerce Development" },
        { href: "/quote", label: "Discuss Your Requirements" },
      ]}
    />
  );
}
