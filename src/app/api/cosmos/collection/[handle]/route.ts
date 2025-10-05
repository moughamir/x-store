import { NextResponse } from "next/server";
import { CosmosError } from "@/lib/api/cosmos/cosmos-error";
import { serverGetCollection } from "@/lib/api/cosmos/cosmos-server";


function normalizePositiveInteger(
  rawValue: string | null,
  fallback?: number
): number | undefined {
  if (rawValue === null) {
    return fallback;
  }
  const parsed = Number.parseInt(rawValue, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
}

export async function GET(req: Request, { params }: { params: { handle: string } }) {
  const { handle } = params;
  const url = new URL(req.url);

  const page = normalizePositiveInteger(url.searchParams.get("page"));
  const limit = normalizePositiveInteger(url.searchParams.get("limit"));

  try {
    const collection = await serverGetCollection(handle, {
      page,
      limit,
      revalidate: 120,
    });
    return NextResponse.json(collection);
  } catch (error: unknown) {
    console.error("[/api/cosmos/collection] error:", error);

    if (error instanceof CosmosError) {
      return NextResponse.json(
        {
          error: error.message ?? "Failed to fetch collection",
          details: error.payload ?? null,
        },
        { status: error.status ?? 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch collection",
      },
      { status: 500 }
    );
  }
}
