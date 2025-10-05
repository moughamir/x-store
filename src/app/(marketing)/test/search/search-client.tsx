"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ProductCard } from "@/components/ProductCard";
import { PaginationControl } from "@/components/PaginationControl";
import { useSearchParams, useRouter } from "next/navigation";
import type { Product, ProductSearchResponse } from "@/types/api";

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ page?: number; total_pages?: number }>({});

  const page = Number(searchParams.get("page") ?? "1");

  async function loadSearch(q: string, page: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/cosmos/search?q=${encodeURIComponent(q)}&limit=12&page=${page}`
      );
      if (!res.ok) throw new Error(`Search failed: ${res.status}`);
      const data = (await res.json()) as ProductSearchResponse;
      setResults(data.products ?? []);
      setMeta(data.meta ?? {});
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unknown error occurred during search"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/test/search?q=${encodeURIComponent(query)}&page=1`);
  }

  useEffect(() => {
    if (query.trim()) {
      loadSearch(query, page);
    }
  }, [query, page]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
        />
        <Button type="submit">Search</Button>
      </form>

      {loading && (
        <div className="flex justify-center p-4">
          <Spinner className="h-6 w-6" />
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {results.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {meta.total_pages && meta.total_pages > 1 && (
        <PaginationControl
          currentPage={meta.page ?? 1}
          totalPages={meta.total_pages}
        />
      )}
    </div>
  );
}
