import CartItemList from '@/components/cart/CartItemList';
import CartSummary from '@/components/cart/CartSummary';

export const metadata = {
  title: 'Shopping Cart | X-Store',
  description: 'View your shopping cart',
};

export default function CartPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItemList />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
