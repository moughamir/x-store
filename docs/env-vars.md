# Environment Variable Management

This document outlines the "utilities-first" rule for managing environment variables in this project.

## The "Utilities-First" Rule

To ensure consistency, security, and maintainability, all environment variables must be accessed through the utility functions provided in `src/utils/getEnvVars.ts`. Direct access to `process.env` is **prohibited** outside of this file.

### Rationale

*   **Centralized Management:** All environment variable access is centralized in one file, making it easy to manage and audit.
*   **Type Safety:** The utility functions provide type safety, reducing the risk of typos and other errors.
*   **Security:** By funneling all environment variable access through a single file, we can prevent accidental exposure of sensitive information to the client.
*   **Consistency:** The utility functions ensure that environment variables are accessed consistently throughout the application.
*   **Testability:** Centralizing environment variable access makes it easier to mock environment variables in tests.

### Usage

To access an environment variable, import the appropriate utility function from `src/utils/getEnvVars.ts` and call it.

**Example:**

```typescript
import { getPublicConfig, getRuntimeConfig } from "@/utils/getEnvVars";

const publicConfig = getPublicConfig();
const runtimeConfig = getRuntimeConfig();

const apiUrl = publicConfig.apiUrl;
const appName = runtimeConfig?.appName;
```

### Adding New Environment Variables

To add a new environment variable, follow these steps:

1.  Add the environment variable to the appropriate `.env` file.
2.  Add the environment variable to the appropriate utility function in `src/utils/getEnvVars.ts`.

### Recommended Environment Variables

*   `NEXT_PUBLIC_SITE_URL`: The public URL of the site.
*   `BASE_URL`: The base URL of the site (server-side).
*   `DB_HOST`: The database host.
*   `DB_USER`: The database user.
*   `DB_PASS`: The database password.
*   `DB_PORT`: The database port.
*   `DB_NAME`: The database name.
*   `NEXT_PUBLIC_API_URL`: The URL of the API.
*   `NEXT_PUBLIC_ANALYTICS_ID`: The ID for the analytics service.
*   `APP_NAME`: The name of the application.
*   `APP_ENV`: The environment of the application (e.g., "development", "production").
