export default function OrderSummary() {
  // This would typically get cart items from a state or context
  const items = [
    { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 4.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-500 ml-2">x{item.quantity}</span>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-b border-gray-200 py-4 my-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
