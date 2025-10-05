import { Button } from "@/components/ui/button";

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
    <Button
      size="lg"
      className="w-full"
      onClick={() => {
        // This would typically add the product to a cart state or context
        console.log(`Adding ${product.name} to cart`);
      }}
    >
      Add to Cart
    </Button>
  );
}
