"use client";

import { ShoppingCart } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export function CartIcon() {
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();

  const fetchCartData = useCallback(async () => {
    try {
      const cartId = localStorage.getItem("cart");
      const parsedCartId: { id: string } | null = cartId
        ? JSON.parse(cartId)
        : null;
      const token = localStorage.getItem("accessToken");
      if (!cartId || !token) {
        setQuantity(0);
        return;
      }

      const response = await fetch(
        `${apiUrl}/cart/carts/${parsedCartId?.id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("cartId");
          setQuantity(0);
          return;
        }
        throw new Error("Failed to fetch cart data");
      }

      const cartData = await response.json();
      const totalQuantity = cartData.items.reduce(
        (total: number, item: any) => total + item.quantity,
        0
      );
      setQuantity(totalQuantity);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setQuantity(0);
    }
  }, []);

  useEffect(() => {
    fetchCartData();

    // Listen for cart updates
    window.addEventListener("cartUpdated", fetchCartData);

    // Clean up the event listener
    return () => {
      window.removeEventListener("cartUpdated", fetchCartData);
    };
  }, [fetchCartData]);

  return (
    <button
      onClick={() => router.push("/cart")}
      className="relative bg-transparent border-none cursor-pointer p-0"
    >
      <ShoppingCart className="h-6 w-6" />
      {quantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {quantity}
        </span>
      )}
    </button>
  );
}
