import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

async function getOrder(id: string) {
  // This would typically fetch from an API
  const orderId = parseInt(id);

  if (isNaN(orderId) || orderId < 1 || orderId > 100) {
    return null;
  }

  // Mock product data
  return {
    id: orderId,
    name: `Product ${orderId}`,
    price: 19.99 + orderId,
    description: `This is the detailed description for Product ${orderId}. It includes all the features and benefits of this amazing product.`,
    stock: 10 + orderId,
    image: "/images/products/placeholder.jpg",
  };
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrder(params.id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Placeholder Orders Page</h1>
    </div>
  );
}
