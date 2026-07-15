import type { MetadataRoute } from "next";

const baseUrl = "https://kuwaittaxiserviceq8.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ar`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/areas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/saudi-transfers`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/rates`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/reservation`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
