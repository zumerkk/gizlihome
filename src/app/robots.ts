import type { MetadataRoute } from "next";
import { brand } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/images/"],
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${brand.siteUrl}/sitemap.xml`,
  };
}
