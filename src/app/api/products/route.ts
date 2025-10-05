import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_REVALIDATE_SECONDS } from "@/lib/api/productsApi";
import {
  serverListProducts,
  serverSearchProducts,
} from "@/lib/api/cosmos/cosmos-server";

function normalizePositiveInteger(
  rawValue: string | null,
  fallback: number
): number {
  if (!rawValue) {
    return fallback;
  }

  const parsed = Number.parseInt(rawValue, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim() || undefined;
  const fields = searchParams.get("fields") ?? undefined;
  const limit = normalizePositiveInteger(searchParams.get("limit"), 20);
  const page = normalizePositiveInteger(searchParams.get("page"), 1);

  try {
    const cosmosResponse = search
      ? await serverSearchProducts(search, {
          page,
          limit,
          fields,
          revalidate: DEFAULT_REVALIDATE_SECONDS,
        })
      : await serverListProducts({
          page,
          limit,
          fields,
          revalidate: DEFAULT_REVALIDATE_SECONDS,
        });

    return NextResponse.json({
      products: cosmosResponse.products ?? [],
      meta: cosmosResponse.meta ?? {
        page,
        limit,
        total: cosmosResponse.products?.length ?? 0,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/products:", error);
    const statusCandidate = (error as { status?: number }).status;
    const status = typeof statusCandidate === "number" ? statusCandidate : 500;
    const message =
      error instanceof Error ? error.message : "Failed to fetch products";

    return NextResponse.json(
      {
        error: message,
        products: [],
        meta: {
          page,
          limit,
          total: 0,
          total_pages: 0,
        },
      },
      { status }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { message: "Product creation not implemented" },
    { status: 501 }
  );
}
