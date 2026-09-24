export const SITE_URL = "https://kaytechwebsolutions.vercel.app";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonial", label: "Testimonials" },
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
