"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useCart } from "./CartProvider";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartSidebar() {
  const { cart, removeFromCart, isCartOpen, toggleCart, cartTotal, updateQuantity } = useCart();

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-card transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} shadow-xl`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <Button variant="ghost" size="icon" onClick={toggleCart}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 p-4">
          <ShoppingCart className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="p-4 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-start space-x-4 pb-4 border-b">
                <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-1">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="mx-2 text-sm">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-card">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total:</span>
          <span className="font-bold">${cartTotal.toFixed(2)}</span>
        </div>
        <Link href="/checkout" onClick={toggleCart}>
          <Button className="w-full" disabled={cart.length === 0}>
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}