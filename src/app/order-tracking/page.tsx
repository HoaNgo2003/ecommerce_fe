"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  MessageCircle,
  User,
  ShoppingBag,
  Bell,
  Ticket,
  Coins,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price_item: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  created_at: string;
  total_price: string;
  status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("accessToken");
        const customerData = localStorage.getItem("customer");
        const customerId: { id: string } | null = customerData
          ? JSON.parse(customerData)
          : null;
        if (!token || !customerId) {
          throw new Error("Authentication information missing");
        }

        const response = await fetch(
          `${apiUrl}/order/orders/customer_orders?customer_id=${customerId?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching orders"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      {/* <div className="w-64 bg-white border-r hidden md:block">
        <div className="p-4">
          <nav className="space-y-1">
            <Link
              href="/account"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-sm">My Account</span>
            </Link>
            <Link
              href="/purchases"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <ShoppingBag className="w-5 h-5 text-gray-400" />
              <span className="text-sm">My Purchase</span>
            </Link>
            <Link
              href="/notifications"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="text-sm">Notifications</span>
            </Link>
            <Link
              href="/vouchers"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <Ticket className="w-5 h-5 text-gray-400" />
              <span className="text-sm">My Vouchers</span>
            </Link>
            <Link
              href="/coins"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <Coins className="w-5 h-5 text-gray-400" />
              <span className="text-sm">My Shopee Coins</span>
            </Link>
          </nav>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="h-14 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center text-gray-600">
                  <ChevronLeft className="h-5 w-5" />
                  <span>BACK</span>
                </Link>
                <h1 className="text-xl font-semibold">My Orders</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="container mx-auto px-4 py-6">
          {isLoading && <div className="text-center">Loading orders...</div>}
          {error && <div className="text-center text-red-500">{error}</div>}
          {!isLoading && !error && orders.length === 0 && (
            <div className="text-center">No orders found.</div>
          )}
          {!isLoading && !error && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                    <span className="text-sm font-medium text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {item.product_name} x{item.quantity}
                        </span>
                        <span>${Number(item.price_item).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">
                      ${Number(order.total_price).toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className={`text-sm font-medium ${
                        order.status === "completed"
                          ? "text-green-500"
                          : order.status === "pending"
                          ? "text-yellow-500"
                          : "text-gray-500"
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Button */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600">
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
