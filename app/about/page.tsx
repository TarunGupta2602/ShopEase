import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-lg overflow-hidden mb-12">
          <Image 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
            alt="About Us Hero"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">About ShopEase</h1>
            <p className="text-xl md:text-2xl max-w-2xl text-center">
              Your trusted partner for quality electronics since 2020
            </p>
          </div>
        </div>
        
        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                Founded in 2020, ShopEase began with a simple mission: to provide high-quality electronics and tech accessories at affordable prices with exceptional customer service.
              </p>
              <p className="text-lg mb-4">
                What started as a small online store has grown into a trusted destination for tech enthusiasts and everyday consumers alike. We carefully curate our product selection to ensure we offer only the best products that meet our strict quality standards.
              </p>
              <p className="text-lg">
                Our team consists of tech experts and customer service professionals who are passionate about helping customers find the perfect products for their needs.
              </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Our Story"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Quality</h3>
              <p>
                We never compromise on quality. Every product in our catalog undergoes rigorous testing and quality checks before being offered to our customers.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Customer Satisfaction</h3>
              <p>
                Our customers are at the heart of everything we do. We strive to provide exceptional service and support at every step of your shopping journey.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p>
                We're constantly looking for innovative products and ways to improve our service to meet the evolving needs of our customers.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-64 w-64 rounded-full overflow-hidden mx-auto mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="CEO"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-xl font-bold">John Smith</h3>
              <p className="text-muted-foreground">CEO & Founder</p>
            </div>
            <div className="text-center">
              <div className="relative h-64 w-64 rounded-full overflow-hidden mx-auto mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="CTO"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-xl font-bold">Sarah Johnson</h3>
              <p className="text-muted-foreground">CTO</p>
            </div>
            <div className="text-center">
              <div className="relative h-64 w-64 rounded-full overflow-hidden mx-auto mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Head of Customer Service"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-xl font-bold">Michael Chen</h3>
              <p className="text-muted-foreground">Head of Customer Service</p>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="mb-6">Explore our wide range of high-quality electronics and tech accessories.</p>
          <Link href="/products">
            <Button size="lg" variant="secondary">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}