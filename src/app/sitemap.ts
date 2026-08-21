import type { MetadataRoute } from "next";
import { ratesData } from "@/components/ratesData";
import { saudiRoutes } from "@/components/saudiRoutes";
import { gccRoutes } from "@/components/gccRoutes";
import { slugifyArea } from "@/lib/areas";
import { blogService } from "@/lib/blogService";

const baseUrl = "https://kuwaittaxiserviceq8.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const areaPages: MetadataRoute.Sitemap = ratesData.map((row) => ({
    url: `${baseUrl}/areas/${slugifyArea(row.area)}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const saudiRoutePages: MetadataRoute.Sitemap = saudiRoutes.map((row) => ({
    url: `${baseUrl}/saudi-transfers/${slugifyArea(row.city)}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const gccRoutePages: MetadataRoute.Sitemap = gccRoutes.map((row) => ({
    url: `${baseUrl}/gcc-transfers/${slugifyArea(row.city)}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogs = await blogService.getAllBlogs();
    blogPages = blogs
      .filter((b) => b.status === "published")
      .map((b) => ({
        url: `${baseUrl}/blog/${b.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {
    blogPages = [];
  }

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ar`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ar/airport-taxi`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ar/saudi-transfers`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/areas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/airport-taxi`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/saudi-transfers`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/gcc-transfers`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/rates`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/reservation`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    ...areaPages,
    ...saudiRoutePages,
    ...gccRoutePages,
    ...blogPages,
  ];
}
