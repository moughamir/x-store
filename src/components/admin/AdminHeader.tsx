import Link from 'next/link';

export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <div>
        <h2 className="text-lg font-semibold">Welcome back, Admin</h2>
        <p className="text-sm text-gray-500">Here is what is happening with your store today.</p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/admin/orders"
          className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
        >
          View Orders
        </Link>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary/90"
        >
          Add Product
        </Link>
      </div>
    </header>
  );
}
