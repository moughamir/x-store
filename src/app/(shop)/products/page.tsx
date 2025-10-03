import ProductGrid from '@/components/product/ProductGrid';

export const metadata = {
  title: 'Products | X-Store',
  description: 'Browse all products at X-Store',
};

export default async function ProductsPage() {
  // This would typically fetch from an API
  const products = [
    { id: 1, name: 'Product 1', price: 19.99, image: '/images/products/placeholder.jpg' },
    { id: 2, name: 'Product 2', price: 29.99, image: '/images/products/placeholder.jpg' },
    { id: 3, name: 'Product 3', price: 39.99, image: '/images/products/placeholder.jpg' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
