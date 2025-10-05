// src/app/(marketing)/test/page.tsx  (Server Component)
import React from "react";
import { createCosmosClient } from "@/lib/api/cosmos/cosmos-client";
import { serverListProducts } from "@/lib/api/cosmos/cosmos-server";
import Image from "next/image";

const data = await serverListProducts({ limit: 120, revalidate: 60 });

export default async function Page() {
  try {
    const client = createCosmosClient({
      baseUrl: process.env.COSMOS_BASE_URL ?? "/cosmos",
      apiKey: process.env.COSMOS_API_KEY ?? null,
      fetchImpl: fetch,
    });

    const data = await client.listProducts({ limit: 120, page: 120 });
    return (
      <main>
        {data.products?.length ? (
          <ul>
            {data.products.map((p) => (
              <li key={p.id}>
                HANDLE {p.handle} <br />
                PRICE: [{p.price}] TITLE: {p.title} <br />
                VARIANT - {p.variants.length}
                IMAGE{" "}
                <Image
                  src={p.images[0]?.src || "/images/products/placeholder.svg"}
                  alt={p.title}
                  width={100}
                  height={100}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found</p>
        )}
      </main>
    );
  } catch (err: any) {
    console.error("Cosmos error:", err);
    return (
      <main>
        <h2>Error</h2>
        <pre>{err instanceof Error ? err.message : String(err)}</pre>
        <pre>{JSON.stringify(err.payload ?? err, null, 2)}</pre>
      </main>
    );
  }
}
