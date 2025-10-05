import { createCosmosClient } from "@/lib/api/cosmos/cosmos-client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { path?: string[] } }
) {
  const pathParts = params?.path ?? [];
  if (pathParts.length === 0) {
    return NextResponse.json({ error: "path required" }, { status: 400 });
  }
  const path = pathParts.join("/");

  const client = createCosmosClient({
    baseUrl: process.env.COSMOS_BASE_URL ?? "/cosmos",
    apiKey: process.env.COSMOS_API_KEY ?? null, // optional, but safe on server
    fetchImpl: fetch,
  });

  try {
    const upstream = await client.fetchCdn(path, {
      nextOptions: { revalidate: 60 },
    });
    // propagate some useful headers
    const contentType =
      upstream.headers.get("content-type") ?? "application/octet-stream";
    const cacheControl = upstream.headers.get("cache-control") ?? undefined;

    const headers: Record<string, string> = { "content-type": contentType };
    if (cacheControl) headers["cache-control"] = cacheControl;

    // stream body back to client
    return new Response(upstream.body, { status: upstream.status, headers });
  } catch (error: unknown) {
    if (error instanceof CosmosError) {
      return NextResponse.json(
        { error: error.message ?? "CDN fetch failed" },
        { status: error.status ?? 502 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 502 }
    );
  }
}
