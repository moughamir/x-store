import { NextResponse } from "next/server";
import { getPublicConfig, getRuntimeConfig } from "@/utils/getEnvVars";

export async function GET() {
  // Use runtime config helpers instead of direct process.env reads
  const runtime = getRuntimeConfig();
  const appName = runtime?.appName ?? null;
  const environment = runtime?.environment ?? null;

  // Only return public configuration to the client
  const publicConfig = getPublicConfig();

  return NextResponse.json({
    appName,
    environment,
    config: publicConfig,
  });
}
