import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const routes = [
  "",
  "/about",
  "/services",
  "/services/website-design-development",
  "/services/business-websites",
  "/services/ecommerce",
  "/services/custom-web-development",
  "/projects",
  "/pricing",
  "/quote",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
  }));
}
