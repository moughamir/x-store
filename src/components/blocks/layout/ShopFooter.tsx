import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ShopFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} X-Store. All rights reserved.</p>
        <div className="flex items-center justify-center gap-2">
          <Button variant="link" asChild>
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/terms">Terms of Service</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/support">Support</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}

