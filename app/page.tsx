"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { products } from "@/lib/products";
import Link from "next/link";

export default function Home() {
  const { addToCart } = useCart();
  const [featuredProducts] = useState(products.slice(0, 6));

  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[500px] rounded-lg overflow-hidden mb-12">
          <Image 
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
            alt="Hero Image"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Welcome to ShopEase</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center">
              Discover the latest tech gadgets and accessories at unbeatable prices
            </p>
            <Link href="/products">
              <Button size="lg" className="text-lg">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/products/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Link href={`/products/${product.id}`}>
                    <Button variant="default">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Audio', 'Wearables', 'Phones', 'Computers', 'Accessories'].map((category) => (
              <Link href={`/products?category=${category}`} key={category}>
                <div className="bg-card hover:bg-muted transition-colors rounded-lg p-6 text-center">
                  <h3 className="text-lg font-medium">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-6">Stay updated with the latest products and exclusive offers</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-2 rounded-md text-foreground bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}