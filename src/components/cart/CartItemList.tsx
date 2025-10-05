import Image from 'next/image';

export default function CartItemList() {
  // This would typically fetch cart items from a state or context
  const cartItems = [
    {
      id: 1,
      productId: 1,
      name: "Product 1",
      price: 19.99,
      quantity: 2,
      image: "/images/products/placeholder.svg",
    },
    {
      id: 2,
      productId: 2,
      name: "Product 2",
      price: 29.99,
      quantity: 1,
      image: "/images/products/placeholder.svg",
    },
  ];

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center border-b pb-4">
          <div className="w-20 h-20 relative flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="object-cover rounded"
            />
          </div>
          <div className="ml-4 flex-grow">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-gray-500">${item.price.toFixed(2)}</p>
            <div className="flex items-center mt-2">
              <button className="w-8 h-8 flex items-center justify-center border rounded">-</button>
              <span className="mx-2">{item.quantity}</span>
              <button className="w-8 h-8 flex items-center justify-center border rounded">+</button>
            </div>
          </div>
          <div className="ml-4">
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            <button className="text-red-500 text-sm mt-2">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
