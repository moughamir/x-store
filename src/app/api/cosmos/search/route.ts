import { NextResponse } from "next/server";
import { CosmosError } from "@/lib/api/cosmos/cosmos-error";
import { serverSearchProducts } from "@/lib/api/cosmos/cosmos-server";

/**
 * Proxy endpoint for product search.
 * Accepts same query params as backend: q (required), page, limit, fields, format
 *
 * Example: /api/cosmos/search?q=shirt&page=1&limit=10
 *
 * NOTE: We only forward JSON. If you need msgpack streaming, let me know.
 */

function normalizePositiveInteger(rawValue: string | null): number | undefined {
  if (rawValue === null) {
    return undefined;
  }

  const parsed = Number.parseInt(rawValue, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (!q) {
    return NextResponse.json(
      { error: "Missing query parameter 'q'" },
      { status: 400 }
    );
  }

  const page = normalizePositiveInteger(url.searchParams.get("page"));
  const limit = normalizePositiveInteger(url.searchParams.get("limit"));
  const fields = url.searchParams.get("fields") ?? undefined;
  const format =
    (url.searchParams.get("format") as "json" | "msgpack") ?? "json";

  try {
    const results = await serverSearchProducts(q, {
      page,
      limit,
      fields,
      format,
      revalidate: 60, // cache search results for 60s
    });
    return NextResponse.json(results);
  } catch (error: unknown) {
    console.error("[/api/cosmos/search] error:", error);

    if (error instanceof CosmosError) {
      return NextResponse.json(
        {
          error: error.message ?? "Search failed",
          details: error.payload ?? null,
        },
        { status: error.status ?? 500 }
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Search failed",
      },
      { status: 500 }
    );
  }
}
