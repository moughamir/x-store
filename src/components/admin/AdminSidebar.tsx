"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Route } from "next";

const adminLinks: { href: Route; label: string }[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/orders", label: "Orders" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r bg-white p-6">
      <h1 className="mb-6 text-xl font-semibold">X-Store Admin</h1>
      <nav className="space-y-1">
        {adminLinks.map((link) => {
          const isActive = pathname?.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100 ${
                isActive
                  ? "bg-gray-100 font-medium text-gray-900"
                  : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
