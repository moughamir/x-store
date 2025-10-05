import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
  product: {
    id: number | string;
    title: string;
    handle: string;
    price?: string | number;
    images?: { src: string }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images?.[0]?.src;

  return (
    <Link href={`/product/${product.handle ?? product.id}`}>
      <Card className="hover:shadow-lg transition">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.title}
            width={400}
            height={400}
            className="rounded-t-lg object-cover w-full h-64"
          />
        ) : (
          <Skeleton className="w-full h-64 rounded-t-lg" />
        )}
        <CardHeader>
          <CardTitle className="truncate">{product.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {product.price ? (
            <Badge variant="secondary">${product.price}</Badge>
          ) : (
            <span className="text-muted-foreground text-sm">No price</span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
