"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("accessToken");
      const cartData = JSON.parse(
        localStorage.getItem("cart") || '{"id": null}'
      );
      if (!token) {
        router.push("/signin");
        return;
      }

      const response = await fetch(`${apiUrl}/cart/cart-items/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: Number(product.id),
          quantity: 1,
          cart_id: cartData.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();

      // Update local storage
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      cart.items = [...(cart.items || []), data];
      localStorage.setItem("cart", JSON.stringify(cart));

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);

      // Trigger storage event for CartIcon to update
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      setError("Failed to add item to cart. Please try again." + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`w-full border border-black py-3 rounded-full transition-colors ${
          isAdded ? "bg-green-500 text-white" : "hover:bg-gray-100"
        }`}
      >
        {isLoading ? "Adding..." : isAdded ? "✓ Added to cart" : "Add to cart"}
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
}
