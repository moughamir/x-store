"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Spinner } from "@/components/ui/spinner";
import { PaginationControl } from "@/components/PaginationControl";
import { useSearchParams } from "next/navigation";

export default function CollectionPage({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = params;
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");

  const [collection, setCollection] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/cosmos/collection/${encodeURIComponent(
            handle
          )}?limit=12&page=${page}`
        );
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        setCollection(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [handle, page]);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Collection: {handle}</h1>

      {loading && (
        <div className="flex justify-center p-4">
          <Spinner className="h-6 w-6" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {collection?.products?.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {collection?.meta?.total_pages && collection.meta.total_pages > 1 && (
        <PaginationControl
          currentPage={collection.meta.page ?? 1}
          totalPages={collection.meta.total_pages}
        />
      )}
    </main>
  );
}
