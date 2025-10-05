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
