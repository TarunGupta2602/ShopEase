"use client";

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Product type definition
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Cart item type definition
export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load cart from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('shopping-cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
          localStorage.removeItem('shopping-cart');
        }
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isClient && cart.length >= 0) {
      localStorage.setItem('shopping-cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(item => item.id === product.id);
      
      let newCart;
      if (existingItem) {
        // Increase quantity if product already in cart
        newCart = prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new product to cart with quantity 1
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }
      
      // Save to localStorage immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem('shopping-cart', JSON.stringify(newCart));
      }
      
      return newCart;
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      
      // Save to localStorage immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem('shopping-cart', JSON.stringify(newCart));
      }
      
      return newCart;
    });
  };

  // Update quantity of a product in cart
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newCart = prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      );
      
      // Save to localStorage immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem('shopping-cart', JSON.stringify(newCart));
      }
      
      return newCart;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopping-cart', JSON.stringify([]));
    }
  };

  // Toggle cart sidebar
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Calculate total price of items in cart
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      toggleCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}