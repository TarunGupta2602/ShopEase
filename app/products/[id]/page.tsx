import { getProductById, products } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = parseInt(params.id);
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="flex-1 p-6">
      <ProductDetails product={product} relatedProducts={relatedProducts} />
    </div>
  );
}

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}