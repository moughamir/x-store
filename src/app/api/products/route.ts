import { NextResponse } from 'next/server';
import { getDatabaseConfig } from '@/utils/getEnvVars';

// GET /api/products
export async function GET(request: Request) {
  // This would typically fetch from a database
  const dbConfig = getDatabaseConfig();
  console.log('Using database config:', dbConfig);

  // Mock products data
  const products = [
    { id: 1, name: 'Product 1', price: 19.99, image: '/images/products/placeholder.jpg' },
    { id: 2, name: 'Product 2', price: 29.99, image: '/images/products/placeholder.jpg' },
    { id: 3, name: 'Product 3', price: 39.99, image: '/images/products/placeholder.jpg' },
  ];

  return NextResponse.json({ products });
}

// POST /api/products
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // This would typically save to a database
    const newProduct = {
      id: Date.now(),
      name: body.name,
      price: body.price,
      image: body.image || '/images/products/placeholder.jpg',
    };

    return NextResponse.json(
      { product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
