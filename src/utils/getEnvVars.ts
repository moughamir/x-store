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
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    featureFlags: process.env.NEXT_PUBLIC_FEATURE_FLAGS
      ? JSON.parse(process.env.NEXT_PUBLIC_FEATURE_FLAGS)
      : {},
  };
};

// Example of runtime vs build-time environment variables
export const getRuntimeConfig = () => {
  // This will be evaluated at runtime during dynamic rendering
  if (typeof window === 'undefined') {
    return {
      appName: process.env.APP_NAME,
      environment: process.env.APP_ENV,
      baseUrl: process.env.BASE_URL,
      docsUrl: process.env.DOCS_URL,
    };
  }

  // In the browser, only NEXT_PUBLIC_ variables are available
  return {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  };
};
