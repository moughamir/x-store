import { ApiClientError } from "@/lib/errors";

const COSMOS_API_BASE_URL =
  process.env.COSMOS_API_BASE_URL ?? process.env.COSMOS_BASE_URL ?? "/cosmos";
const DEFAULT_REVALIDATE_SECONDS = 60;
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export { DEFAULT_REVALIDATE_SECONDS };

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

type QueryValue = string | number | boolean | null | undefined;
type QueryObject = Record<string, QueryValue>;

export interface CosmosProductImage {
  id: number;
  product_id: number;
  position: number;
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface CosmosProductVariant {
  id: number;
  title: string;
  price: number;
  sku?: string;
  inventory_quantity?: number;
  [key: string]: unknown;
}

export interface CosmosProductOption {
  id: number;
  name: string;
  position: number;
  values: string[];
}

export interface CosmosProduct {
  id: number;
  title: string;
  handle: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  tags?: string;
  price?: number;
  compare_at_price?: number;
  variants?: CosmosProductVariant[];
  options?: CosmosProductOption[];
  images?: CosmosProductImage[];
  [key: string]: unknown;
}

export interface CosmosProductListMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface CosmosProductListResponse {
  products: CosmosProduct[];
  meta: CosmosProductListMeta;
}

export interface CosmosRequestConfig {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
  signal?: AbortSignal;
  headers?: HeadersInit;
}

export interface ListProductsParams {
  page?: number;
  limit?: number;
  fields?: string | string[];
}

export async function listProducts(
  params: ListProductsParams = {},
  config?: CosmosRequestConfig
): Promise<CosmosProductListResponse> {
  const endpoint = "/products";
  validatePaginationParams(params, endpoint);

  const query: QueryObject = {
    page: params.page,
    limit: params.limit,
    fields: normalizeFields(params.fields),
  };

  return cosmosFetch<CosmosProductListResponse>({
    path: endpoint,
    method: "GET",
    query,
    revalidate: config?.revalidate,
    cache: config?.cache,
    signal: config?.signal,
    tags: config?.tags,
    headers: config?.headers,
  });
}

interface CosmosFetchOptions {
  path: string;
  method?: HttpMethod;
  query?: QueryObject;
  body?: unknown;
  headers?: HeadersInit;
  revalidate?: number;
  cache?: RequestCache;
  signal?: AbortSignal;
  tags?: string[];
}

async function cosmosFetch<T>({
  path,
  method = "GET",
  query,
  body,
  headers,
  revalidate,
  cache,
  signal,
  tags,
}: CosmosFetchOptions): Promise<T> {
  const url = buildCosmosUrl(path, query);
  const apiKey = getApiKey();
  const mergedHeaders = new Headers(headers);

  if (!mergedHeaders.has("Accept")) {
    mergedHeaders.set("Accept", "application/json");
  }

  mergedHeaders.set("X-API-KEY", apiKey);

  const init: RequestInit & {
    next?: { revalidate?: number; tags?: string[] };
  } = {
    method,
    headers: mergedHeaders,
    signal,
  };

  if (cache) {
    init.cache = cache;
  }

  if (body !== undefined && method !== "GET" && method !== "HEAD") {
    mergedHeaders.set("Content-Type", "application/json");
    init.body = JSON.stringify(body);
  }

  const resolvedRevalidate = resolveRevalidate(revalidate);
  const nextOptions: { revalidate?: number; tags?: string[] } = {};

  if (resolvedRevalidate !== undefined) {
    nextOptions.revalidate = resolvedRevalidate;
  }

  if (tags && tags.length > 0) {
    nextOptions.tags = tags;
  }

  if (Object.keys(nextOptions).length > 0) {
    init.next = nextOptions;
  }

  const response = await fetch(url, init);
  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (!response.ok) {
    const errorPayload = isJson
      ? await tryParseJson<{ message?: string; code?: string }>(response)
      : undefined;
    const fallbackMessage = `Cosmos API request failed with status ${response.status}.`;
    const fallbackCode = response.statusText || "REQUEST_FAILED";

    throw new ApiClientError(
      errorPayload?.message ?? fallbackMessage,
      response.status,
      errorPayload?.code ?? fallbackCode,
      url
    );
  }

  if (!isJson) {
    throw new ApiClientError(
      "Unexpected Cosmos API response format (expected JSON).",
      response.status,
      "UNSUPPORTED_CONTENT_TYPE",
      url
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiClientError(
      "Failed to parse Cosmos API response as JSON.",
      response.status,
      "INVALID_JSON",
      url
    );
  }
}

function resolveRevalidate(revalidate?: number): number | undefined {
  if (revalidate === undefined) {
    return DEFAULT_REVALIDATE_SECONDS;
  }

  if (
    typeof revalidate !== "number" ||
    Number.isNaN(revalidate) ||
    revalidate < 0
  ) {
    throw new ApiClientError(
      "`revalidate` must be a non-negative number when provided.",
      400,
      "INVALID_REVALIDATE_VALUE"
    );
  }

  return revalidate;
}

function tryParseJson<T>(response: Response): Promise<T | undefined> {
  return response
    .json()
    .then((value) => value as T)
    .catch(() => undefined);
}

function getApiKey(): string {
  const apiKey = process.env.COSMOS_API_KEY;

  if (!apiKey) {
    throw new ApiClientError(
      "COSMOS_API_KEY is not configured in the environment.",
      401,
      "COSMOS_API_KEY_MISSING",
      "COSMOS_API"
    );
  }

  return apiKey;
}

function buildCosmosUrl(path: string, query?: QueryObject): string {
  const endpointPath = ensureLeadingSlash(path);
  const base = normalizeBaseUrl(COSMOS_API_BASE_URL);
  let url: string;

  if (base && isAbsoluteUrl(base)) {
    const baseUrl = base.endsWith("/") ? base : `${base}/`;
    const urlObj = new URL(endpointPath.replace(/^\//, ""), baseUrl);
    url = urlObj.toString();
  } else {
    url = `${base}${endpointPath}`;
  }

  const queryString = buildQueryString(query);
  return queryString ? `${url}?${queryString}` : url;
}

function buildQueryString(query?: QueryObject): string {
  if (!query) {
    return "";
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    params.append(key, String(value));
  }

  const serialized = params.toString();
  return serialized;
}

function normalizeFields(fields?: string | string[]): string | undefined {
  if (!fields) {
    return undefined;
  }

  if (typeof fields === "string") {
    return fields.trim() || undefined;
  }

  const joined = fields
    .map((field) => field.trim())
    .filter(Boolean)
    .join(",");

  return joined || undefined;
}

function validatePaginationParams(
  params: ListProductsParams,
  endpoint: string
): void {
  if (params.page !== undefined && params.page < 1) {
    throw new ApiClientError(
      "`page` must be greater than or equal to 1.",
      400,
      "INVALID_PAGE",
      endpoint
    );
  }

  if (params.limit !== undefined && (params.limit < 1 || params.limit > 100)) {
    throw new ApiClientError(
      "`limit` must be between 1 and 100 inclusive.",
      400,
      "INVALID_LIMIT",
      endpoint
    );
  }
}

function ensureLeadingSlash(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function normalizeBaseUrl(base: string): string {
  if (!base) {
    return "";
  }

  return base === "/" ? "" : base.replace(/\/+$/g, "");
}

function isAbsoluteUrl(value: string): boolean {
  return ABSOLUTE_URL_PATTERN.test(value);
}
