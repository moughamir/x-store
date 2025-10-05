import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between border-b bg-background px-6 py-4">
      <div>
        <h2 className="text-lg font-semibold">Welcome back, Admin</h2>
        <p className="text-sm text-muted-foreground">
          Here is what is happening with your store today.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button asChild variant="outline">
          <Link href={{ pathname: "/admin/orders" }}>View Orders</Link>
        </Button>
        <Button asChild>
          <Link href={{ pathname: "/admin/products/new" }}>Add Product</Link>
        </Button>
      </div>
    </header>
  );
}

