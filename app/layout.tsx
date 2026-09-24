import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { CONTACT, SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Website Design & Development in Nigeria | Kaytech Web Solutions";
const description =
  "Kaytech Web Solutions designs and develops modern, responsive websites for businesses in Nigeria and beyond.";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kaytech Web Solutions",
  url: SITE_URL,
  description,
  email: CONTACT.email,
  areaServed: [
    { "@type": "Country", name: "Nigeria" },
    { "@type": "City", name: "Abuja" },
  ],
  serviceType: [
    "Website Design",
    "Website Development",
    "Business Websites",
    "E-commerce Development",
    "Custom Web Solutions",
  ],
  sameAs: [CONTACT.twitterUrl],
};

export const viewport = { width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Kaytech Web Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={inter.variable + " h-full antialiased"}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <Navbar />
          <div className="pt-24 sm:pt-28">{children}</div>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
