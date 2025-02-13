"use client";

import { useCart } from "@/context/cart-context";
import { useState } from "react";

type AddToCartButtonProps = {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    seller: {
      name: string;
      rating: string;
    };
    shipping: {
      cost: number;
    };
  };
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full border border-black py-3 rounded-full hover:bg-gray-100 transition-colors"
    >
      {isAdded ? "✓ Added to cart" : "Add to cart"}
    </button>
  );
}
