"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { Product } from "@/lib/products";
import Link from "next/link";

interface ProductDetailsProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="text-muted-foreground hover:text-foreground">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative h-[500px] rounded-xl overflow-hidden bg-white shadow-lg">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-contain p-4"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground text-lg">{product.description}</p>

          <div className="bg-secondary/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Category</h3>
            <Link 
              href={`/products?category=${product.category}`}
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {product.category}
            </Link>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md bg-white">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="text-lg font-bold"
              >
                −
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="text-lg font-bold"
              >
                +
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button 
            size="lg" 
            className="w-full text-lg h-14"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          {/* Features */}
          <div className="bg-secondary/50 rounded-lg p-4">
            <h3 className="font-medium mb-3">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-muted-foreground">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="specs" className="mb-12">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="details">Additional Details</TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="p-6 border rounded-lg mt-4 bg-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-3">
                <span className="font-medium text-muted-foreground">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="details" className="p-6 border rounded-lg mt-4 bg-card">
          <div className="prose prose-gray max-w-none">
            <p className="mb-4 text-muted-foreground">{product.description}</p>
            <p className="text-muted-foreground">
              Additional product details and information about materials, usage, and care instructions.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Card key={relatedProduct.id} className="overflow-hidden group">
                <div className="relative h-48 w-full bg-white">
                  <Image 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    fill
                    className="object-contain p-4 transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">
                    <Link 
                      href={`/products/${relatedProduct.id}`} 
                      className="hover:text-primary transition-colors"
                    >
                      {relatedProduct.name}
                    </Link>
                  </h3>
                  <p className="text-lg font-bold text-primary mb-4">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                  <Button 
                    onClick={() => addToCart(relatedProduct)}
                    className="w-full"
                    variant="secondary"
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 