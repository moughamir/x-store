// src/app/(marketing)/test/page.tsx  (Server Component)
import React from "react";
import { createCosmosClient } from "@/lib/api/cosmos/cosmos-client";
import { CosmosError } from "@/lib/api/cosmos/cosmos-error";
import type { Product } from "@/lib/api/cosmos/cosmos-types";
import Image from "next/image";

export default async function Page() {
  try {
    const cosmosBaseUrl = process.env.COSMOS_BASE_URL;
    console.log("DEBUG: cosmosBaseUrl =", cosmosBaseUrl); // Added debug log
    if (!cosmosBaseUrl) {
      throw new Error("COSMOS_BASE_URL is not defined.");
    }
    const client = createCosmosClient({
      baseUrl: cosmosBaseUrl,
      apiKey: process.env.COSMOS_API_KEY ?? null,
      fetchImpl: fetch,
    });

    const { products = [] } = await client.listProducts({
      limit: 120,
      page: 120,
    });

    if (products.length === 0) {
      return (
        <main>
          <p>No products found</p>
        </main>
      );
    }

    return (
      <main>
        <ul>
          {products.map((product: Product) => {
            const variantCount = product.variants?.length ?? 0;
            const primaryImage =
              product.images?.[0]?.src || "/images/products/placeholder.svg";

            return (
              <li key={product.id}>
                HANDLE {product.handle} <br />
                PRICE: [{product.price}] TITLE: {product.title} <br />
                VARIANT - {variantCount}
                IMAGE{" "}
                <Image
                  src={primaryImage}
                  alt={product.title}
                  width={100}
                  height={100}
                />
              </li>
            );
          })}
        </ul>
      </main>
    );
  } catch (error: unknown) {
    console.error("Cosmos error:", error);

    const message = error instanceof Error ? error.message : "Unknown error";
    const payload = error instanceof CosmosError ? error.payload : undefined;
    const serializedPayload = payload ? JSON.stringify(payload, null, 2) : null;

    return (
      <main>
        <h2>Error</h2>
        <pre>{message}</pre>
        {serializedPayload ? <pre>{serializedPayload}</pre> : null}
      </main>
    );
  }
}
