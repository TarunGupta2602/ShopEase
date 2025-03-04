"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { products, getAllCategories } from "@/lib/products";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState<string>('default');
  const categories = getAllCategories();

  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory]);

  // Sort products when sort option changes
  useEffect(() => {
    const sortedProducts = [...filteredProducts];
    
    switch (sortOption) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (by id)
        sortedProducts.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(sortedProducts);
  }, [sortOption]);

  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        
        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map(category => (
              <Button 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2">Sort by:</label>
            <select 
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border rounded-md bg-background"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
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
        )}
      </div>
    </div>
  );
}