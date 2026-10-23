import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const PATHS = ["", "/product", "/faq", "/contact", "/shipping-returns", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p ? 0.6 : 1 }));
}
