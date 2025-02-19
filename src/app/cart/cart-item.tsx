"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface CartItemProps {
  item: {
    id: string;
    quantity: number;
    product_details: {
      name: string;
      price: number;
      description: string;
      images: string[];
      stock: number;
    };
    price_item: string;
  };
  onUpdateQuantity: (itemId: string, newQuantity: number) => Promise<void>;
  onRemoveItem: (itemId: string) => Promise<void>;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number.parseInt(event.target.value, 10);
    if (isNaN(newQuantity)) {
      setQuantity(0);
      setError("Please enter a valid number");
    } else if (newQuantity < 0) {
      setQuantity(0);
      setError("Quantity cannot be negative");
    } else if (newQuantity > item.product_details.stock) {
      setQuantity(item.product_details.stock);
      setError(`Maximum available quantity is ${item.product_details.stock}`);
    } else {
      setQuantity(newQuantity);
      setError("");
    }
  };

  const handleUpdateQuantity = async () => {
    if (quantity !== item.quantity && quantity > 0) {
      setIsUpdating(true);
      setError("");
      try {
        if (quantity > item.product_details.stock) {
          throw new Error(
            `Maximum available quantity is ${item.product_details.stock}`
          );
        }
        await onUpdateQuantity(item.id, quantity);

        // Fetch updated cart data
        await fetchUpdatedCartData();

        // Trigger a custom event to update the cart icon
        window.dispatchEvent(new Event("cartUpdated"));
      } catch (error) {
        console.error("Failed to update quantity:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to update quantity. Please try again."
        );
        setQuantity(item.quantity); // Reset to original quantity on error
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    setError("");
    try {
      await onRemoveItem(item.id);

      // Fetch updated cart data
      await fetchUpdatedCartData();

      // Trigger a custom event to update the cart icon
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Failed to remove item:", error);
      setError("Failed to remove item. Please try again.");
      setIsRemoving(false);
    }
  };

  const fetchUpdatedCartData = async () => {
    try {
      const cartIdString = localStorage.getItem("cart");
      const cartId: { id: string } | null = cartIdString
        ? JSON.parse(cartIdString)
        : null;

      if (!cartId) {
        throw new Error("No cart found");
      }

      const response = await fetch(`${apiUrl}/cart/carts/${cartId.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch updated cart data");
      }

      await response.json();
      // You might want to update the parent component's state here
      // or use a state management solution to update the cart data globally
    } catch (error) {
      console.error("Error fetching updated cart data:", error);
    }
  };

  return (
    <div className="border rounded-lg p-6 mb-4">
      <div className="flex gap-6">
        <div className="w-32 h-32 relative">
          <Image
            src={"/placeholder.svg"}
            alt={item.product_details.name}
            fill
            className="object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="font-medium hover:underline">
                <Link href="#">{item.product_details.name}</Link>
              </h3>
            </div>
            <div className="text-right">
              <div className="font-medium">
                US ${Number(item.price_item).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor={`quantity-${item.id}`} className="text-sm">
                Quantity
              </label>
              <input
                type="number"
                id={`quantity-${item.id}`}
                className="border rounded px-2 py-1 text-sm w-16"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleUpdateQuantity}
                min="1"
                max={item.product_details.stock}
                disabled={isUpdating}
              />
            </div>
            {isUpdating && (
              <span className="text-sm text-gray-500">Updating...</span>
            )}
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <p className="text-sm text-gray-500 mt-2">
            Available stock: {item.product_details.stock}
          </p>

          <div className="mt-4 flex items-center gap-4">
            <button className="text-blue-600 hover:underline text-sm">
              Save for later
            </button>
            <button
              className="text-blue-600 hover:underline text-sm"
              onClick={handleRemove}
              disabled={isRemoving}
            >
              {isRemoving ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
