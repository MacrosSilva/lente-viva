import type { MetadataRoute } from "next";

import { projects } from "@/lib/data";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const staticPaths = ["/", "/trabalhos", "/sobre", "/contato"];
  const projectPaths = projects.map((p) => `/trabalhos/${p.slug}`);

  return [...staticPaths, ...projectPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
