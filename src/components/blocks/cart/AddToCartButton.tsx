interface Product {
  id: number;
  name: string;
  price: number;
}

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  return (
    <button
      className="w-full bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
      onClick={() => {
        // This would typically add the product to a cart state or context
        console.log(`Adding ${product.name} to cart`);
      }}
    >
      Add to Cart
    </button>
  );
}
