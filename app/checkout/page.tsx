"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1500);
  };
  
  if (cart.length === 0) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to your cart before checking out.</p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-start space-x-4">
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
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping & Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Shipping Information */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Address </Label>
                          <Input 
                            id="address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input 
                              id="state" 
                              name="state" 
                              value={formData.state} 
                              onChange={handleChange} 
                              required 
                            />
                          </div>
                          <div>
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input 
                              id="zipCode" 
                              name="zipCode" 
                              value={formData.zipCode} 
                              onChange={handleChange} 
                              required 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Payment Information */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Payment Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            name="cardNumber" 
                            placeholder="1234 5678 9012 3456" 
                            value={formData.cardNumber} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input 
                            id="cardName" 
                            name="cardName" 
                            value={formData.cardName} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input 
                            id="expiryDate" 
                            name="expiryDate" 
                            placeholder="MM/YY" 
                            value={formData.expiryDate} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            name="cvv" 
                            placeholder="123" 
                            value={formData.cvv} 
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}