import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const routes = ["", "/about", "/services", "/projects", "/pricing", "/quote"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
  }));
}
