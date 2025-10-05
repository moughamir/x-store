import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from "@/components/blocks/cart/AddToCartButton";

export async function generateMetadata({ params }: { params: { id: string } }) {
  // This would typically fetch from an API
  const product = { id: params.id, name: `Product ${params.id}`, price: 19.99 };

  return {
    title: `${product.name} | X-Store`,
    description: `Buy ${product.name} at X-Store`,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  // This would typically fetch from an API
  const productId = parseInt(params.id);

  if (isNaN(productId) || productId < 1 || productId > 100) {
    notFound();
  }

  const product = {
    id: productId,
    name: `Product ${productId}`,
    price: 19.99 + productId,
    description: `This is the detailed description for Product ${productId}. It includes all the features and benefits of this amazing product.`,
    image: "/images/products/placeholder.svg",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
        <div className="mb-6">
          <p className="text-gray-700">{product.description}</p>
        </div>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
