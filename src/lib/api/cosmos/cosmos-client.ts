/**
 * Cosmos Product API client (corrected version)
 *
 * - All endpoints now send X-API-KEY (backend enforces auth).
 * - API key is trimmed automatically.
 * - Debug logging shows outgoing requests with masked key.
 * - Msgpack supported (optional, requires @msgpack/msgpack).
 */

import {
  Format,
  ProductList,
  Product,
  FetchCdnOptions,
  GetCollectionParams,
  GetProductParams,
  ProductListParams,
  QueryParams,
  SearchProductsParams,
  CosmosClientOptions,
} from "./cosmos-types";
import { CosmosError } from "./cosmos-error";
import { buildQuery, safeStringify } from "./cosmos-utils";

/* ---------- Client ---------- */

export class CosmosClient {
  baseUrl: string;
  apiKey?: string | null;
  fetchImpl: typeof fetch;

  constructor(opts: CosmosClientOptions = {}) {
    this.baseUrl = (opts.baseUrl ?? "/cosmos").replace(/\/$/, "");
    const k = opts.apiKey ?? null;
    this.apiKey = typeof k === "string" ? k.trim() || null : k;
    this.fetchImpl = opts.fetchImpl ?? (globalThis.fetch as typeof fetch);

    if (process.env.NODE_ENV !== "production") {
      console.debug("[CosmosClient] Initialized with baseUrl=", this.baseUrl);
    }
  }

  private async decodeMsgpack<T>(buffer: ArrayBuffer): Promise<T> {
    try {
      const mod = await import("@msgpack/msgpack");
      return mod.decode(new Uint8Array(buffer)) as T;
    } catch (err) {
      throw new CosmosError(
        "msgpack decode failed. Install '@msgpack/msgpack' (npm i @msgpack/msgpack) or request JSON format.",
        undefined,
        { cause: String(err) }
      );
    }
  }

  private buildHeaders(
    requireApiKey = true,
    extra?: Record<string, string | undefined>
  ) {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (extra) {
      for (const [k, v] of Object.entries(extra)) {
        if (v !== undefined) headers[k] = v;
      }
    }
    if (requireApiKey) {
      if (!this.apiKey) {
        throw new CosmosError(
          "API key required but not provided to CosmosClient."
        );
      }
      headers["X-API-KEY"] = this.apiKey!;
    }
    return headers;
  }

  private async request<T>(
    path: string,
    opts?: {
      method?: "GET" | "POST" | "PUT" | "DELETE";
      params?: QueryParams;
      requireApiKey?: boolean;
      format?: Format;
      body?: unknown;
      signal?: AbortSignal | null;
      nextOptions?: RequestInit["next"];
    }
  ): Promise<T> {
    const method = opts?.method ?? "GET";
    const url = this.baseUrl + path + buildQuery(opts?.params);
    const acceptHeader =
      opts?.format === "msgpack"
        ? "application/msgpack, application/octet-stream"
        : "application/json";

    const headers = this.buildHeaders(true, {
      Accept: acceptHeader,
      "Content-Type": opts?.body ? "application/json" : undefined,
    });

    if (process.env.NODE_ENV !== "production") {
      const masked = { ...headers };
      if (masked["X-API-KEY"]) masked["X-API-KEY"] = "***REDACTED***";
      console.debug("[CosmosClient] OUTGOING", {
        url,
        method,
        headers: masked,
        nextOptions: opts?.nextOptions,
      });
    }

    const fetchInit: RequestInit & { next?: RequestInit["next"] } = {
      method,
      headers,
      body: opts?.body ? JSON.stringify(opts.body) : undefined,
      signal: opts?.signal ?? undefined,
    };
    if (opts?.nextOptions) {
      fetchInit.next = opts.nextOptions;
    }

    const res = await this.fetchImpl(url, fetchInit as RequestInit);

    // read response
    let rawText: string | undefined;
    let parsedBody: unknown;
    try {
      rawText = await res.text();
      if (rawText) {
        try {
          parsedBody = JSON.parse(rawText);
        } catch {
          parsedBody = rawText;
        }
      }
    } catch {
      parsedBody = undefined;
    }

    if (!res.ok) {
      let msg: string;
      if (parsedBody && typeof parsedBody === "object") {
        const bodyWithMessage = parsedBody as { message?: unknown };
        msg =
          typeof bodyWithMessage.message === "string"
            ? bodyWithMessage.message
            : safeStringify(parsedBody);
      } else if (parsedBody) {
        msg = String(parsedBody);
      } else {
        msg = `${res.status} ${res.statusText}`;
      }
      throw new CosmosError(`Request failed: ${msg}`, res.status, parsedBody);
    }

    // success
    if (opts?.format === "msgpack") {
      const buffer = rawText
        ? new TextEncoder().encode(rawText).buffer
        : await res.arrayBuffer();
      return this.decodeMsgpack<T>(buffer);
    }

    const contentType = (res.headers.get("content-type") ?? "").toLowerCase();
    if (contentType.includes("application/json")) {
      if (parsedBody !== undefined) return parsedBody as T;
      return (await res.json()) as T;
    }
    return (parsedBody ?? rawText ?? "") as T;
  }

  /* ---------- Endpoints ---------- */

  async listProducts(params?: ProductListParams): Promise<ProductList> {
    return this.request<ProductList>("/products", {
      method: "GET",
      params: {
        page: params?.page,
        limit: params?.limit,
        fields: params?.fields,
        format: params?.format ?? "json",
      },
      format: params?.format ?? "json",
      nextOptions: params?.nextOptions,
    });
  }

  async searchProducts(params: SearchProductsParams): Promise<ProductList> {
    return this.request<ProductList>("/products/search", {
      method: "GET",
      params: {
        q: params.q,
        page: params.page,
        limit: params.limit,
        fields: params.fields,
        format: params.format ?? "json",
      },
      format: params.format ?? "json",
      nextOptions: params?.nextOptions,
    });
  }

  async getProduct(
    key: string | number,
    params?: GetProductParams
  ): Promise<Product> {
    return this.request<Product>(
      `/products/${encodeURIComponent(String(key))}`,
      {
        method: "GET",
        params: { format: params?.format ?? "json" },
        format: params?.format ?? "json",
        nextOptions: params?.nextOptions,
      }
    );
  }

  async getCollection(
    handle: string,
    params?: GetCollectionParams
  ): Promise<ProductList> {
    return this.request<ProductList>(
      `/collections/${encodeURIComponent(handle)}`,
      {
        method: "GET",
        params: {
          page: params?.page,
          limit: params?.limit,
          fields: params?.fields,
          format: params?.format ?? "json",
        },
        format: params?.format ?? "json",
        nextOptions: params?.nextOptions,
      }
    );
  }

  async fetchCdn(path: string, opts?: FetchCdnOptions) {
    const encoded = encodeURI(path);
    const url = `${this.baseUrl}/cdn/${encoded}`;
    const headers: Record<string, string> = {};
    if (this.apiKey) headers["X-API-KEY"] = this.apiKey;
    const fetchInit: RequestInit & { next?: RequestInit["next"] } = {
      method: "GET",
      headers,
      signal: opts?.signal ?? undefined,
    };
    if (opts?.nextOptions) {
      fetchInit.next = opts.nextOptions;
    }
    const res = await this.fetchImpl(url, fetchInit as RequestInit);
    if (!res.ok) {
      let rawText: string | undefined;
      try {
        rawText = await res.text();
      } catch {}
      throw new CosmosError(
        `CDN fetch failed: ${rawText ?? `${res.status} ${res.statusText}`}`,
        res.status,
        rawText
      );
    }
    return res;
  }
}

/* ---------- Factory ---------- */
export const createCosmosClient = (opts?: CosmosClientOptions) =>
  new CosmosClient(opts);

export default createCosmosClient;
