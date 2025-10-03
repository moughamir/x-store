/**
 * Example utility showing how to use environment variables in Next.js
 */

// Server-side only environment variables (not exposed to the browser)
export const getDatabaseConfig = () => {
  // These will only be available on the server
  return {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  };
};

// Public environment variables (available in browser)
export const getPublicConfig = () => {
  return {
    appName: process.env.APP_NAME,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    // Public canonical site URL for client-side code (optional)
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    featureFlags: process.env.NEXT_PUBLIC_FEATURE_FLAGS
      ? JSON.parse(process.env.NEXT_PUBLIC_FEATURE_FLAGS)
      : {},
  };
};

// Example of runtime vs build-time environment variables
export const getRuntimeConfig = () => {
  // This will be evaluated at runtime during dynamic rendering
  if (typeof window === "undefined") {
    return {
      appName: process.env.APP_NAME,
      appVersion: process.env.APP_VERSION,
      appDevel: process.env.APP_DEVEL,
      environment: process.env.APP_ENV,
      // Server-side canonical base URL. May be set as BASE_URL in production.
      baseUrl: process.env.BASE_URL,
      // Also expose a server-side siteUrl fallback to support routes that prefer NEXT_PUBLIC_SITE_URL
      siteUrl: process.env.BASE_URL ?? process.env.NEXT_PUBLIC_SITE_URL,
      docsUrl: process.env.DOCS_URL,
    };
  }

  // In the browser, only NEXT_PUBLIC_ variables are available
  return {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  };
};
