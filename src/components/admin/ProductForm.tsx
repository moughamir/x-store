'use client';

import { useState } from 'react';

interface ProductFormData {
  name: string;
  price: string;
  description: string;
  stock: string;
  image: string;
}

export default function ProductForm({ product }: { product?: any }) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || '',
    price: product?.price ? product.price.toString() : '',
    description: product?.description || '',
    stock: product?.stock ? product.stock.toString() : '',
    image: product?.image || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.price) {
      alert('Name and price are required');
      return;
    }

    try {
      // This would typically send data to an API
      const endpoint = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description,
          stock: parseInt(formData.stock || '0'),
          image: formData.image || '/images/products/placeholder.jpg',
        }),
      });

      if (response.ok) {
        // Redirect to products list
        window.location.href = '/admin/products';
      } else {
        const data = await response.json();
        alert(`Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
          Stock Quantity
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="/images/products/placeholder.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.location.href = '/admin/products'}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          {product ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
