"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, LogOut, Search } from "lucide-react";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { CartIcon } from "@/components/CartIcon";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface CartData {
  id: string;
  items: {
    id: string;
    quantity: number;
    product_details: {
      name: string;
      price: number;
      description: string;
      images: string[];
    };
    price_item: string;
  }[];
  created_at: string;
  customer: string;
  total_price: number;
}

export default function CartPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    router.push("/signin");
  };
  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    setIsLoading(true);
    setError(null);
    const cart = localStorage.getItem("cart");
    const parsedCart: { id: string } | null = cart ? JSON.parse(cart) : null;
    const { id } = parsedCart || {};
    if (!id) {
      setError("No cart found. Please add items to your cart.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/cart/carts/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }

      const data: CartData = await response.json();
      setCartData(data);
    } catch (err) {
      setError("Failed to load cart data. Please try again." + err);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(cartData);
  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (!cartData) return;

    try {
      const response = await fetch(`${apiUrl}/cart/cart-items/${itemId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          cart_id: cartData.id,
          product_id: itemId,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }

      // Refresh cart data after successful update
      await fetchCartData();
    } catch (error) {
      console.error("Error updating cart item:", error);
      setError("Failed to update cart item. Please try again.");
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const response = await fetch(`${apiUrl}/cart/cart-items/${itemId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove cart item");
      }

      // Refresh cart data after successful removal
      await fetchCartData();
    } catch (error) {
      console.error("Error removing cart item:", error);
      setError("Failed to remove cart item. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-3 text-sm">
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <span>
                Welcome back!{" "}
                <button
                  onClick={handleLogout}
                  className="text-blue-600 hover:underline flex items-center"
                >
                  Logout <LogOut className="h-4 w-4 ml-1" />
                </button>
              </span>
            ) : (
              <span>
                Hi!{" "}
                <Link href="/signin" className="text-blue-600 hover:underline">
                  Sign in
                </Link>{" "}
                or{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  register
                </Link>
              </span>
            )}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/daily-deals"
                className="hover:text-blue-600 transition-colors"
              >
                Daily Deals
              </Link>
              <Link
                href="/brand-outlet"
                className="hover:text-blue-600 transition-colors"
              >
                Brand Outlet
              </Link>
              <Link
                href="/gift-cards"
                className="hover:text-blue-600 transition-colors"
              >
                Gift Cards
              </Link>
              <Link
                href="/help"
                className="hover:text-blue-600 transition-colors"
              >
                Help & Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/order-tracking">Order list</Link>
            <Link href="/sell">Sell</Link>
            <Link href="/watchlist" className="flex items-center gap-1">
              Watchlist
              <ChevronDown className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5" />
              <CartIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-12">
            <Link href="/" className="shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KpNlpPkfs3C7rJC3mEAfzXApQDH0Ep.png"
                alt="Logo"
                width={120}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <div className="flex flex-1 items-center gap-4">
              <select className="w-[200px] h-11 border rounded-md px-3">
                <option value="all">All Categories</option>
                <option value="books">Books</option>
                <option value="phones">Phones</option>
                <option value="clothes">Clothes</option>
              </select>
              <div className="flex flex-1 items-center">
                <input
                  type="search"
                  placeholder="Search for anything"
                  className="flex-1 h-11 border rounded-l-md px-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-blue-600 text-white h-11 px-6 rounded-r-md flex items-center">
                  <Search className="h-4 w-4" />
                  <span className="ml-2">Search</span>
                </button>
              </div>
              <button className="text-sm text-blue-600">Advanced</button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 flex items-center gap-8 overflow-x-auto py-4 text-sm">
          {["Books", "Phones", "Clothes"].map((category) => (
            <Link
              key={category}
              href={`products/${category.toLowerCase()}`}
              className="shrink-0 hover:text-blue-600 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Shopping cart</h1>
          <Link
            href="/feedback"
            className="text-sm text-blue-600 hover:underline"
          >
            Send Us Your Comments
          </Link>
        </div>

        {isLoading && <p>Loading cart data...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {cartData && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cartData.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary cartData={cartData} />
            </div>
          </div>
        )}

        {/* Related Items section can be added here if needed */}
      </div>
    </div>
  );
}
