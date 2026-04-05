import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        image1: body.image1,
        image2: body.image2 || null,
        image3: body.image3 || null,
        priceRange: body.priceRange,
        bottlePrice: parseFloat(body.bottlePrice),
        cartonPrice: parseFloat(body.cartonPrice),
        sku: body.sku,
        alcVol: body.alcVol,
        bottlesPerCarton: parseInt(body.bottlesPerCarton) || 0,
        inStock: true,
      },
    });

    if (Array.isArray(body.categoryIds) && body.categoryIds.length > 0) {
      await Promise.all(
        body.categoryIds.map(async (catId: string) => {
          await prisma.productCategoryLink.create({
            data: {
              productId: product.id,
              categoryId: catId,
            },
          });
        })
      );
    }

    return new Response(JSON.stringify({ success: true, product }), {
      status: 201,
    });
  } catch (error: any) {
    console.error("❌ Error creating product:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const categoryId = searchParams.get("categoryId"); // 👈 new
    const skip = (page - 1) * limit;

    // Filter by category if provided
    const where = categoryId
      ? {
          categories: {
            some: { categoryId },
          },
        }
      : {};

    const total = await prisma.product.count({ where });

    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        categories: {
          include: { category: true },
        },
      },
    });

 const formatted = products.map((p: any) => ({
  ...p,
  inStock: p.inStock ?? false,
  categoryNames: p.categories.map((c: any) => c.category.name),
}));

    return new Response(
      JSON.stringify({
        products: formatted,
        total,
        page,
        pages: Math.ceil(total / limit),
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error fetching products:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}