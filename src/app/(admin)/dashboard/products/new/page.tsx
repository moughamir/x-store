import ProductForm from '@/components/admin/ProductForm';

export const metadata = {
  title: 'Add New Product | X-Store Admin',
  description: 'Add a new product to your store',
};

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <ProductForm />
      </div>
    </div>
  );
}
