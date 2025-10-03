import { ReactNode } from 'react';
import ShopHeader from '@/components/layout/ShopHeader';
import ShopFooter from '@/components/layout/ShopFooter';

export const metadata = {
  title: 'X-Store | Online Shopping',
  description: 'Shop the latest products at X-Store',
};

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ShopHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <ShopFooter />
    </div>
  );
}
