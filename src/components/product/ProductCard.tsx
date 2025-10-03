import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="aspect-square relative mb-2 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <h3 className="text-sm font-medium">{product.name}</h3>
      <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
    </Link>
  );
}
