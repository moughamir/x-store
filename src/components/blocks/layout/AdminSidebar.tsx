"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Route } from "next";
import { Button } from "@/components/ui/button";

const adminLinks: { href: Route; label: string }[] = [
  { href: "/", label: "Home" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r bg-background p-6">
      <h1 className="mb-6 text-xl font-semibold">X-Store Admin</h1>
      <nav className="space-y-1">
        {adminLinks.map((link) => {
          const isActive = pathname?.startsWith(link.href);

          return (
            <Button
              key={link.href}
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}

