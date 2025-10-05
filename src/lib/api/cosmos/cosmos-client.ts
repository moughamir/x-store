/**
 * Cosmos Product API client (corrected version)
 *
 * - All endpoints now send X-API-KEY (backend enforces auth).
 * - API key is trimmed automatically.
 * - Debug logging shows outgoing requests with masked key.
 * - Msgpack supported (optional, requires @msgpack/msgpack).
 */

import { Format, ProductList, Product } from "./cosmos-types";

/* ---------- Error class ---------- */
export class CosmosError extends Error {
  status?: number;
  payload?: any;
  constructor(message: string, status?: number, payload?: any) {
    super(message);
    this.name = "CosmosError";
    this.status = status;
    this.payload = payload;
    Object.setPrototypeOf(this, new.target.prototype);
  }
  toString() {
    const payloadPart =
      this.payload === undefined
        ? ""
        : typeof this.payload === "string"
        ? ` payload=${this.payload}`
        : ` payload=${safeStringify(this.payload)}`;
    return `${this.name}: ${this.message}${
      this.status ? ` (status=${this.status})` : ""
    }${payloadPart}`;
  }
}

/* ---------- Helpers ---------- */
function safeStringify(v: any): string {
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    try {
      return String(v);
    } catch {
      return "<unserializable payload>";
    }
  }
}

function buildQuery(params?: Record<string, any>): string {
  if (!params) return "";
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    q.set(k, String(v));
  }
  const s = q.toString();
  return s ? `?${s}` : "";
}

/* ---------- Client ---------- */
export interface CosmosClientOptions {
  baseUrl?: string; // default '/cosmos'
  apiKey?: string | null;
  fetchImpl?: typeof fetch; // pass Next's fetch in server components if desired
}

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

  private async request<T = any>(
    path: string,
    opts?: {
      method?: "GET" | "POST" | "PUT" | "DELETE";
      params?: Record<string, any>;
      requireApiKey?: boolean;
      format?: Format;
      body?: any;
      signal?: AbortSignal | null;
      nextOptions?: Record<string, any>;
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
        nextOptions: (opts as any)?.nextOptions,
      });
    }

    const fetchInit: RequestInit & { next?: Record<string, any> } = {
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
    let parsedBody: any;
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
        msg = parsedBody.message ?? safeStringify(parsedBody);
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

  async listProducts(params?: {
    page?: number;
    limit?: number;
    fields?: string;
    format?: Format;
    nextOptions?: Record<string, any>;
  }): Promise<ProductList> {
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

  async searchProducts(params: {
    q: string;
    page?: number;
    limit?: number;
    fields?: string;
    format?: Format;
    nextOptions?: Record<string, any>;
  }): Promise<ProductList> {
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
    params?: { format?: Format; nextOptions?: Record<string, any> }
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
    params?: {
      page?: number;
      limit?: number;
      fields?: string;
      format?: Format;
      nextOptions?: Record<string, any>;
    }
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

  async fetchCdn(
    path: string,
    opts?: { signal?: AbortSignal | null; nextOptions?: Record<string, any> }
  ) {
    const encoded = encodeURI(path);
    const url = `${this.baseUrl}/cdn/${encoded}`;
    const headers: Record<string, string> = {};
    if (this.apiKey) headers["X-API-KEY"] = this.apiKey;
    const fetchInit: RequestInit & { next?: Record<string, any> } = {
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
