"use client";

export default function CartSummary() {
  // This would typically calculate totals from a cart state or context
  const subtotal = 69.97;
  const shipping = 4.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
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

      <button
        className="w-full bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors mt-6"
        onClick={() => {
          // This would typically navigate to checkout
          window.location.href = "/checkout";
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
