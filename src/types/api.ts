export interface ApiProduct {
  id: string;
  title: string;
  handle: string;
  body_html: string;
  price: number;
  compare_at_price?: number;
  images: ApiProductImage[];
  product_type: string;
  in_stock: boolean;
  rating: number;
  review_count: number;
  tags: string;
  vendor: string;
  variants: ApiProductVariant[];
  options: ApiProductOption[];
  created_at: string;
  updated_at: string;
  quantity?: number;
  raw_json?: string;
}

export interface ApiProductImage {
  id: string;
  product_id: string;
  position: number;
  alt?: string;
  src: string;
  width?: number;
  height?: number;
  created_at: string;
  updated_at: string;
  variant_ids?: string[];
}

export interface ApiProductVariant {
  id: string;
  product_id: string;
  title: string;
  option1?: string;
  option2?: string;
  option3?: string;
  sku?: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image?: string;
  available: boolean;
  price: number;
  grams: number;
  compare_at_price?: number;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface ApiProductOption {
  id: string;
  product_id: string;
  name: string;
  position: number;
  values: string[];
}
