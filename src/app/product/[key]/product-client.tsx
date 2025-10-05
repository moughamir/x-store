"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import type { Product, Variant } from "@/lib/api/cosmos/cosmos-types";

export default function ProductClient({ productKey }: { productKey: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/cosmos/product/${encodeURIComponent(productKey)}`
        );
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data: Product = await res.json();
        setProduct(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      }
    }
    load();
  }, [productKey]);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!product) return <p>Loading product...</p>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      {product.images?.[0] && (
        <Image
          src={product.images[0].src}
          alt={product.title}
          width={400}
          height={400}
          className="rounded mb-6 max-w-lg"
        />
      )}

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <p className="text-gray-700 mt-4">Handle: {product.handle}</p>
        </TabsContent>
        <TabsContent value="variants">
          {product.variants?.length > 0 ? (
            <ul className="list-disc pl-6 mt-4">
              {product.variants.map((variant: Variant) => (
                <li key={variant.id}>
                  {variant.title} – ${variant.price}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-4">No variants available</p>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
