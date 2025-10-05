import { NextResponse } from "next/server";
import { CosmosError } from "@/lib/api/cosmos/cosmos-client";
import { serverGetProduct } from "@/lib/api/cosmos/cosmos-server";

interface Params {
  params: { key: string };
}

export async function GET(req: Request, { params }: Params) {
  const { key } = params;

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
