export const SITE_URL = "https://kaytechwebsolutions.vercel.app";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonial", label: "Testimonials" },
];

export const SERVICE_LINKS = [
  { href: "/services/website-design", label: "Website Design" },
  { href: "/services/business-websites", label: "Business Websites" },
  { href: "/services/ecommerce", label: "E-commerce Design" },
  { href: "/services/custom-website-design", label: "Custom Website Design" },
];

export const CONTACT = {
  email: "usmankhaleed899@gmail.com",
  whatsappNumber: "2349131013311",
  twitterHandle: "KAY_UIUX",
  twitterUrl: "https://x.com/KAY_UIUX",
};

export function waLink(message: string) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
