import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const routes = ["", "/about", "/services", "/projects", "/pricing", "/quote", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
