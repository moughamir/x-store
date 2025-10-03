import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";

export const metadata = {
  title: "X-Store | Online Shopping",
  description: "Shop the latest products at X-Store",
};

async function getFeaturedProducts() {
  // This would typically fetch from an API
  return [
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      image: "/images/products/placeholder.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      image: "/images/products/placeholder.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      image: "/images/products/placeholder.jpg",
    },
  ];
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to X-Store
          </h1>
          <p className="text-xl mb-8 max-w-xl">
            Discover our latest collection of premium products at unbeatable
            prices.
          </p>
          <Link
            href="/products"
            className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link
            href="/products"
            className="text-black font-medium hover:underline"
          >
            View All
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Electronics", "Clothing", "Home & Kitchen"].map((category) => (
              <Link
                key={category}
                href={
                  `/category/${category
                    .toLowerCase()
                    .replace(" & ", "-")}` as any
                }
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-gray-200"></div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-center">
                      {category}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-gray-900 text-white rounded-lg p-8 md:p-12">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-6">
              Stay updated with our latest products and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-full text-black"
                required
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
