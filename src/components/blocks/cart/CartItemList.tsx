import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

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
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item, index) => (
        <div key={item.id}>
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 relative flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <Button variant="outline" size="icon-sm" className="h-8 w-8">
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  className="w-14 h-8 text-center mx-2"
                  readOnly
                />
                <Button variant="outline" size="icon-sm" className="h-8 w-8">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive mt-2"
              >
                <Trash2Icon className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
          {index < cartItems.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
}
