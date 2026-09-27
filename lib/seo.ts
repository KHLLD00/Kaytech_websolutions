import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

const SITE_NAME = "Kaytech Web Solutions";
const OG_IMAGE = "/opengraph-image";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
}: SeoOptions): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_NG",
      images: [{ url: OG_IMAGE, alt: SITE_NAME + " website preview" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
