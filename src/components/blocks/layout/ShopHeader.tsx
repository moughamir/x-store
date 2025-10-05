import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ShopHeader() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold">
          X-Store
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium">
          <Button variant="ghost" asChild>
            <Link href="/products">Products</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={{ pathname: "/categories" }}>Categories</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/cart">Cart</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/account">Account</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

