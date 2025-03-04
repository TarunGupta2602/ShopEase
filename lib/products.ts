// Product type definition
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
  specs: Record<string, string>;
}

// Sample product data
export const products: Product[] = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "High-quality wireless headphones with noise cancellation.",
    category: "Audio",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Foldable design"
    ],
    specs: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz-20kHz",
      "Impedance": "32 Ohm",
      "Weight": "250g",
      "Charging": "USB-C"
    }
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Track your fitness and stay connected with this smart watch.",
    category: "Wearables",
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant (50m)",
      "Sleep tracking",
      "Smartphone notifications"
    ],
    specs: {
      "Display": "1.4\" AMOLED",
      "Resolution": "454 x 454 pixels",
      "Battery Life": "Up to 14 days",
      "Sensors": "Accelerometer, Gyroscope, Heart rate",
      "Compatibility": "iOS 10.0+, Android 6.0+"
    }
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Compact wireless earbuds with amazing sound quality.",
    category: "Audio",
    features: [
      "True wireless design",
      "Active noise cancellation",
      "Touch controls",
      "IPX4 water resistance",
      "Voice assistant support"
    ],
    specs: {
      "Driver Size": "6mm",
      "Battery Life": "6 hours (24 with case)",
      "Charging": "USB-C & Wireless",
      "Bluetooth": "5.2",
      "Weight": "5.4g per earbud"
    }
  },
  {
    id: 4,
    name: "Smartphone",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Latest smartphone with advanced camera and long battery life.",
    category: "Phones",
    features: [
      "Triple camera system",
      "5G connectivity",
      "All-day battery life",
      "Water and dust resistant",
      "Face ID"
    ],
    specs: {
      "Display": "6.1\" Super Retina XDR",
      "Processor": "A15 Bionic",
      "Storage": "128GB/256GB/512GB",
      "RAM": "6GB",
      "Battery": "3240mAh"
    }
  },
  {
    id: 5,
    name: "Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Powerful laptop for work and entertainment.",
    category: "Computers",
    features: [
      "11th Gen Intel Core i7",
      "16GB RAM",
      "512GB SSD",
      "14\" 4K Display",
      "Backlit keyboard"
    ],
    specs: {
      "Processor": "Intel Core i7-1165G7",
      "Graphics": "Intel Iris Xe",
      "Display": "14\" 4K UHD (3840 x 2160)",
      "Battery Life": "Up to 10 hours",
      "Weight": "1.3kg"
    }
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Portable speaker with rich sound and long battery life.",
    category: "Audio",
    features: [
      "360° sound",
      "Waterproof (IPX7)",
      "20-hour battery life",
      "Built-in microphone",
      "Bluetooth 5.0"
    ],
    specs: {
      "Output Power": "20W",
      "Frequency Response": "60Hz-20kHz",
      "Battery": "5000mAh",
      "Charging Time": "3 hours",
      "Dimensions": "180 x 70 x 70 mm"
    }
  },
  {
    id: 7,
    name: "Wireless Keyboard",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Ergonomic wireless keyboard with customizable keys.",
    category: "Accessories",
    features: [
      "Mechanical switches",
      "RGB backlighting",
      "Programmable keys",
      "Multi-device pairing",
      "Ergonomic design"
    ],
    specs: {
      "Type": "Mechanical",
      "Switch Type": "Brown",
      "Battery Life": "Up to 40 hours with lighting",
      "Connectivity": "Bluetooth 5.0, 2.4GHz wireless",
      "Weight": "880g"
    }
  },
  {
    id: 8,
    name: "Wireless Mouse",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Precision wireless mouse with long battery life.",
    category: "Accessories",
    features: [
      "High-precision sensor",
      "Ergonomic design",
      "6 programmable buttons",
      "Up to 70 days battery life",
      "Multi-device connectivity"
    ],
    specs: {
      "DPI": "Up to 4000",
      "Buttons": "6 programmable",
      "Battery": "AA (1)",
      "Connectivity": "Bluetooth, USB receiver",
      "Weight": "99g"
    }
  }
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
}