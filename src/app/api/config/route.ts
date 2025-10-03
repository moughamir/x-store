import { NextResponse } from "next/server";
import { getPublicConfig } from "@/utils/getEnvVars";

export async function GET() {
  // Server-side environment variables (not exposed to client)
  const appName = process.env.APP_NAME;
  const environment = process.env.APP_ENV;

  // Only return public configuration to the client
  const publicConfig = getPublicConfig();

  return NextResponse.json({
    appName,
    environment,
    config: publicConfig,
  });
}
