import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Product | X-Store Admin',
  description: 'Edit product details',
};

async function getProduct(id: string) {
  // This would typically fetch from an API
  const productId = parseInt(id);

  if (isNaN(productId) || productId < 1 || productId > 100) {
    return null;
  }

  // Mock product data
  return {
    id: productId,
    name: `Product ${productId}`,
    price: 19.99 + productId,
    description: `This is the detailed description for Product ${productId}. It includes all the features and benefits of this amazing product.`,
    stock: 10 + productId,
    image: '/images/products/placeholder.jpg',
  };
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
