import prisma from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      categories: {
        include: {
          category: true, 
        },
      },
    },
  });

  if (!product) {
    return <p className="p-6">❌ Product not found</p>;
  }

  // ✅ Replace nulls safely before passing to client
  const safeProduct = {
    ...product,
    name: product.name ?? "",
    description: product.description ?? "",
    image1: product.image1 ?? "",
    image2: product.image2 ?? "",
    image3: product.image3 ?? "",
    priceRange: product.priceRange ?? "",
    bottlePrice: product.bottlePrice ?? 0,
    cartonPrice: product.cartonPrice ?? 0,
    sku: product.sku ?? "N/A",
    bottlesPerCarton: product.bottlesPerCarton ?? 0,
    alcVol: product.alcVol ?? "",
    categories: product.categories?.map((pc: any) => pc.category) ?? [],
  };


  return <ProductDetailClient product={safeProduct} />;
}
