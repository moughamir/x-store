import type { MetadataRoute } from "next";
import { getRuntimeConfig, getPublicConfig } from "../utils/getEnvVars";

export default function manifest(): MetadataRoute.Manifest {
  const runtime = getRuntimeConfig();
  const pub = getPublicConfig();
  const siteUrl = runtime?.siteUrl ?? pub.siteUrl ?? "https://example.com";

  return {
    name: "X Market — Multi-vendor Marketplace",
    short_name: "X Market",
    description:
      "Shop products from multiple providers, compare prices and checkout securely at X Market.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0b1220",
    categories: ["shopping", "ecommerce"],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Open cart",
        short_name: "Cart",
        description: "View your shopping cart",
        url: "/cart",
        icons: [
          {
            src: "/icons/shortcut-cart.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
      {
        name: "Browse products",
        short_name: "Products",
        description: "Browse product catalog",
        url: "/products",
      },
    ],
    related_applications: [
      {
        platform: "webapp",
        url: siteUrl,
      },
    ],
    prefer_related_applications: false,
  };
}
