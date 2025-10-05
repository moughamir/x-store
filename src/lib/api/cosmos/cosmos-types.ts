import {
  ApiProduct,
  ApiProductImage,
  ApiProductOption,
  ApiProductVariant,
} from "@/types/api";

/* ---------- Exposed types ---------- */
export type Product = ApiProduct;
export type Image = ApiProductImage;
export type Variant = ApiProductVariant;
export type Option = ApiProductOption;
export interface Meta {
  total?: number;
  page?: number;
  limit?: number;
  total_pages?: number;
}

export interface ProductList {
  products?: Product[];
  meta?: Meta;
}
export type Format = "json" | "msgpack";
export interface ProductListParams {
  page?: number;
  limit?: number;
  fields?: string;
  format?: Format;
  nextOptions?: RequestNextOptions;
}

export interface SearchProductsParams {
  q: string;
  page?: number;
  limit?: number;
  fields?: string;
  format?: Format;
  nextOptions?: RequestNextOptions;
}

export interface GetProductParams {
  format?: Format;
  nextOptions?: RequestNextOptions;
}

export interface GetCollectionParams {
  page?: number;
  limit?: number;
  fields?: string;
  format?: Format;
  nextOptions?: RequestNextOptions;
}

export interface FetchCdnOptions {
  signal?: AbortSignal | null;
  nextOptions?: RequestNextOptions;
}
export type RequestNextOptions = RequestInit["next"];
export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>;
export interface CosmosClientOptions {
  baseUrl?: string; // default '/cosmos'
  apiKey?: string | null;
  fetchImpl?: typeof fetch; // pass Next's fetch in server components if desired
}
