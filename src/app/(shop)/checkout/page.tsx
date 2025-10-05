import CheckoutForm from '@/components/blocks/checkout/CheckoutForm';
import OrderSummary from '@/components/blocks/checkout/OrderSummary';

export const metadata = {
  title: 'Checkout | X-Store',
  description: 'Complete your purchase',
};

export default function CheckoutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
