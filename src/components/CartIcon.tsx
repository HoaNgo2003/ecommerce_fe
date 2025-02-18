"use client";

import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export function CartIcon() {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    const totalQuantity =
      cart.items?.reduce(
        (total: number, item: any) => total + item.quantity,
        0
      ) || 0;
    setQuantity(totalQuantity);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      const totalQuantity =
        cart.items?.reduce(
          (total: number, item: any) => total + item.quantity,
          0
        ) || 0;
      setQuantity(totalQuantity);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="relative">
      <ShoppingCart className="h-6 w-6" />
      {quantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {quantity}
        </span>
      )}
    </div>
  );
}
