import ProductGrid from "@/components/blocks/product/ProductGrid";

export const metadata = {
  title: "Products | X-Store",
  description: "Browse all products at X-Store",
};

export default async function ProductsPage() {
  // This would typically fetch from an API
  const products = [
    {
      id: 1,
      title: "Product 1",
      handle: "product-1",
      price: 19.99,
      images: [{ src: "/images/products/placeholder.svg" }],
    },
    {
      id: 2,
      title: "Product 2",
      handle: "product-2",
      price: 29.99,
      images: [{ src: "/images/products/placeholder.svg" }],
    },
    {
      id: 3,
      title: "Product 3",
      handle: "product-3",
      price: 39.99,
      images: [{ src: "/images/products/placeholder.svg" }],
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
