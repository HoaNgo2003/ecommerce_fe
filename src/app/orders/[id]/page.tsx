"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price_item: string;
  order: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  created_at: string;
  total_price: string;
  status: string;
  customer: string;
}

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Authentication information missing");
        }

        const response = await fetch(`${apiUrl}/order/orders/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data: Order = await response.json();
        console.log(data);
        setOrder(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching order details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/order-tracking"
                className="flex items-center text-gray-600"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>BACK TO ORDERS</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading && (
          <div className="text-center">Loading order details...</div>
        )}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!isLoading && !error && order && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Order Header */}
            <div className="p-6 border-b">
              <h1 className="text-2xl font-semibold">Order Details</h1>
              <p className="text-gray-600">Order ID: {order.id}</p>
              <p className="text-gray-600">
                Date: {new Date(order.created_at).toLocaleString()}
              </p>
              <p className="text-gray-600">
                Status:{" "}
                <span className="capitalize font-medium">{order.status}</span>
              </p>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b pb-4"
                  >
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg"
                        alt={item.product_name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium">{item.product_name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">
                        Price: ${Number(item.price_item).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        $
                        {(
                          Number(item.price_item) * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-6 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold text-xl">
                  ${Number(order.total_price).toLocaleString()}
                </span>
              </div>
            </div>
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
  );
}
