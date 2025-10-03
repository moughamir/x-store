import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getRuntimeConfig, getPublicConfig } from "../utils/getEnvVars";
import type { Viewport } from "next";
import ShopFooter from "@/components/layout/ShopFooter";
import ShopHeader from "@/components/layout/ShopHeader";
import { Head } from "next/document";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Derive SITE_URL using the project's env utilities (server-safe). Fallback to known public vars or a sensible placeholder.
const runtimeConfig = getRuntimeConfig();
const publicConfig = getPublicConfig();
const SITE_URL =
  runtimeConfig?.siteUrl ??
  runtimeConfig?.baseUrl ??
  publicConfig.siteUrl ??
  publicConfig.apiUrl ??
  "https://example.com";
const METADATA_BASE = new URL(SITE_URL);

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};
export const metadata: Metadata = {
  title: {
    default: `${publicConfig.appName} — Multi-vendor Store`,
    template: `%s | ${publicConfig.appName}`,
  },
  description: `${publicConfig.appName} — Fast, secure multi-vendor marketplace. Browse products from multiple providers, add to cart, checkout with multiple payment providers, and manage orders.`,
  metadataBase: METADATA_BASE,
  keywords: [
    "ecommerce",
    "marketplace",
    "multi-vendor",
    "shopping",
    "online store",
    "checkout",
    "products",
    "orders",
  ],
  authors: [
    { name: "X Market", url: SITE_URL },
    { name: "Support", url: `${SITE_URL}/support` },
  ],
  creator: "X Market Team",
  publisher: "X Market",

  openGraph: {
    title: "X Market — Multi-vendor Marketplace",
    description:
      "Discover products from multiple providers, compare prices, add to cart and checkout securely at X Market.",
    url: SITE_URL,
    siteName: "X Market",
    images: [
      {
        url: `${SITE_URL}/api/og?title=X%20Market`,
        width: 1200,
        height: 630,
        alt: "X Market — Online marketplace",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "X Market — Multi-vendor Marketplace",
    description:
      "Shop products from multiple providers with fast checkout and order tracking.",
    images: [`${SITE_URL}/api/og?title=X%20Market`],
    creator: "@x_market",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "mask-icon", url: "/safari-pinned-tab.svg" },
    ],
  },
  // Robots and indexing rules tuned for an e-commerce site
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Link to a simple web manifest (optional but recommended for PWA behavior)
  manifest: `${SITE_URL}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="prefetch" href="https://cdn.shopify.com" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <ShopHeader />
          <main className="flex-grow">{children}</main>
          <ShopFooter />
        </div>
      </body>
    </html>
  );
}
