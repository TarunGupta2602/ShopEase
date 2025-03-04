"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const [orderNumber] = useState(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
  const [estimatedDelivery] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });

  return (
    <div className="flex-1 p-6">
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        
        <div className="bg-card p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-left">
              <h3 className="font-medium text-muted-foreground mb-2">Order Number</h3>
              <p className="text-lg">{orderNumber}</p>
            </div>
            <div className="text-left">
              <h3 className="font-medium text-muted-foreground mb-2">Estimated Delivery</h3>
              <p className="text-lg">{estimatedDelivery}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/products">
            <Button variant="outline" size="lg">Continue Shopping</Button>
          </Link>
          <Button size="lg" disabled>Track Order</Button>
        </div>
      </div>
    </div>
  );
}