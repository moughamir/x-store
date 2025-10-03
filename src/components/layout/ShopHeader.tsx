import Link from 'next/link';

export default function ShopHeader() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold">
          X-Store
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/products" className="transition-colors hover:text-primary">
            Products
          </Link>
          <Link href="/categories" className="transition-colors hover:text-primary">
            Categories
          </Link>
          <Link href="/cart" className="transition-colors hover:text-primary">
            Cart
          </Link>
          <Link href="/account" className="transition-colors hover:text-primary">
            Account
          </Link>
        </nav>
      </div>
    </header>
  );
}
