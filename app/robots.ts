import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/szamok"] },
    sitemap: "https://zsuzsineni-mesei.hu/sitemap.xml",
  };
}
