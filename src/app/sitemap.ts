import type { MetadataRoute } from "next";
import { ratesData } from "@/components/ratesData";
import { slugifyArea } from "@/lib/areas";

const baseUrl = "https://kuwaittaxiserviceq8.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const areaPages: MetadataRoute.Sitemap = ratesData.map((row) => ({
    url: `${baseUrl}/areas/${slugifyArea(row.area)}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ar`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ar/airport-taxi`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/areas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/airport-taxi`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/saudi-transfers`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/rates`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/reservation`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    ...areaPages,
  ];
}
