/**
 * Cosmos server-side client (Next.js App Router)
 *
 * - Reads COSMOS_API_KEY and COSMOS_BASE_URL from environment.
 * - Provides a preconfigured serverClient.
 * - Exposes typed helper functions for products, search, collections, cdn.
 */

import { createCosmosClient } from "./cosmos-client";
import type { Product, ProductList } from "./cosmos-types";
/* ---------- Load env vars ---------- */
const baseUrl =
  process.env.COSMOS_API_BASE_URL?.trim() ||
  process.env.COSMOS_BASE_URL?.trim() ||
  "https://moritotabi.com/cosmos";
const apiKey = process.env.COSMOS_API_KEY?.trim() || null;

if (process.env.NODE_ENV !== "production") {
  console.debug("[cosmos-server] Using baseUrl:", baseUrl);
  console.debug(
    "[cosmos-server] API key length:",
    apiKey ? apiKey.length : "missing"
  );
}

/* ---------- Server-scoped client ---------- */
export const serverClient = createCosmosClient({
  baseUrl,
  apiKey,
  fetchImpl: fetch, // use Next.js server fetch (supports revalidate / cache)
});

/* ---------- Convenience wrappers ---------- */

export async function serverListProducts(opts?: {
  page?: number;
  limit?: number;
  fields?: string;
  format?: "json" | "msgpack";
  revalidate?: number;
}): Promise<ProductList> {
  return serverClient.listProducts({
    page: opts?.page,
    limit: opts?.limit,
    fields: opts?.fields,
    format: opts?.format ?? "json",
    nextOptions:
      opts?.revalidate !== undefined
        ? { revalidate: opts.revalidate }
        : undefined,
  });
}

export async function serverSearchProducts(
  q: string,
  opts?: {
    page?: number;
    limit?: number;
    fields?: string;
    format?: "json" | "msgpack";
    revalidate?: number;
  }
): Promise<ProductList> {
  return serverClient.searchProducts({
    q,
    page: opts?.page,
    limit: opts?.limit,
    fields: opts?.fields,
    format: opts?.format ?? "json",
    nextOptions:
      opts?.revalidate !== undefined
        ? { revalidate: opts.revalidate }
        : undefined,
  });
}

export async function serverGetProduct(
  key: string | number,
  opts?: { format?: "json" | "msgpack"; revalidate?: number }
): Promise<Product> {
  return serverClient.getProduct(key, {
    format: opts?.format ?? "json",
    nextOptions:
      opts?.revalidate !== undefined
        ? { revalidate: opts.revalidate }
        : undefined,
  });
}

export async function serverGetCollection(
  handle: string,
  opts?: {
    page?: number;
    limit?: number;
    fields?: string;
    format?: "json" | "msgpack";
    revalidate?: number;
  }
): Promise<ProductList> {
  return serverClient.getCollection(handle, {
    page: opts?.page,
    limit: opts?.limit,
    fields: opts?.fields,
    format: opts?.format ?? "json",
    nextOptions:
      opts?.revalidate !== undefined
        ? { revalidate: opts.revalidate }
        : undefined,
  });
}

export async function serverFetchCdn(
  path: string,
  opts?: { revalidate?: number }
) {
  return serverClient.fetchCdn(path, {
    nextOptions:
      opts?.revalidate !== undefined
        ? { revalidate: opts.revalidate }
        : undefined,
  });
}
