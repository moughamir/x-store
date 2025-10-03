import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Order ${params.id} | X-Store`,
    description: `View details for order ${params.id}`,
  };
}

async function getOrder(id: string) {
  // This would typically fetch from an API
  // For demo purposes, we'll return mock data
  if (id === 'ORD-1001') {
    return {
      id: 'ORD-1001',
      date: '2023-05-15',
      status: 'Completed',
      items: [
        { id: 1, name: 'Product 1', price: 19.99, quantity: 2, total: 39.98 },
      ],
      subtotal: 39.98,
      shipping: 4.99,
      tax: 3.20,
      total: 48.17,
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'Anytown',
        postalCode: '12345',
        country: 'United States',
      },
      paymentMethod: 'Credit Card (ending in 4242)',
    };
  }

  return null;
}

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order {order.id}</h1>
        <div className="text-sm text-gray-500">Placed on {order.date}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Order Items</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <div key={item.id} className="px-6 py-4 flex items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="font-semibold">${item.total.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Shipping Information</h2>
            </div>
            <div className="px-6 py-4">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Payment Information</h2>
            </div>
            <div className="px-6 py-4">
              <p>{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow overflow-hidden sticky top-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>

              <div className="mt-6">
                <div className={`px-4 py-2 rounded-full text-center text-sm font-semibold
                  ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                  {order.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
