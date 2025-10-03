import { NextResponse } from 'next/server';

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = parseInt(params.id);

  if (isNaN(productId)) {
    return NextResponse.json(
      { error: 'Invalid product ID' },
      { status: 400 }
    );
  }

  // This would typically fetch from a database
  // For demo purposes, we'll generate a product based on the ID
  const product = {
    id: productId,
    name: `Product ${productId}`,
    price: 19.99 + productId,
    description: `This is the detailed description for Product ${productId}. It includes all the features and benefits of this amazing product.`,
    image: '/images/products/placeholder.jpg',
  };

  return NextResponse.json({ product });
}

// PUT /api/products/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate the request body
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // This would typically update in a database
    const updatedProduct = {
      id: productId,
      name: body.name,
      price: body.price,
      description: body.description || '',
      image: body.image || '/images/products/placeholder.jpg',
    };

    return NextResponse.json({ product: updatedProduct });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = parseInt(params.id);

  if (isNaN(productId)) {
    return NextResponse.json(
      { error: 'Invalid product ID' },
      { status: 400 }
    );
  }

  // This would typically delete from a database

  return NextResponse.json(
    { success: true },
    { status: 200 }
  );
}
