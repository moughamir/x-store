import { NextRequest, NextResponse } from 'next/server';

// GET /api/products/[id]
export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const productId = parseInt(context.params.id as string);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  // This would typically fetch from a database
  // For demo purposes, we'll generate a product based on the ID
  const product = {
    id: productId,
    name: `Product ${productId}`,
    price: 19.99 + productId,
    description: `This is the detailed description for Product ${productId}. It includes all the features and benefits of this amazing product.`,
    image: "/images/products/placeholder.svg",
  };

  return NextResponse.json({ product });
}

// PUT /api/products/[id]
export async function PUT(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  try {
    const productId = parseInt(context.params.id as string);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate the request body
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    // This would typically update in a database
    const updatedProduct = {
      id: productId,
      name: body.name,
      price: body.price,
      description: body.description || "",
      image: body.image || "/images/products/placeholder.svg",
    };

    return NextResponse.json({ product: updatedProduct });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Invalid request body${
          error instanceof Error ? `: ${error.message}` : ""
        }`,
      },
      { status: 400 }
    );
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const productId = parseInt(context.params.id as string);

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
