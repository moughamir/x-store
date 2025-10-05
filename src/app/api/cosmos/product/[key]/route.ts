import { NextResponse } from "next/server";
import { CosmosError } from "@/lib/api/cosmos/cosmos-error";
import { serverGetProduct } from "@/lib/api/cosmos/cosmos-server";

export async function GET(req: Request, context: { params: Promise<{ key: string }> }) {
  const { params } = context;
  const awaitedParams = await params;
  const { key } = awaitedParams;

  try {
    const product = await serverGetProduct(key, { revalidate: 120 });
    return NextResponse.json(product);
  } catch (error: unknown) {
    console.error("[/api/cosmos/product] error:", error);

    if (error instanceof CosmosError) {
      return NextResponse.json(
        {
          error: error.message ?? "Failed to fetch product",
          details: error.payload ?? null,
        },
        { status: error.status ?? 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}
