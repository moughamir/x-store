import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account/", "/settings/", "/admin/", "/login", "/checkout"],
    },
    sitemap: "https://acme.com/sitemap.xml",
  };
}
