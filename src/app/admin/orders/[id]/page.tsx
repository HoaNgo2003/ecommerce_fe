"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Mock order data
const orderItems = [
  {
    id: 1,
    name: "Kristin Watson",
    image: "/placeholder.svg",
    quantity: 1,
    price: "$50.47",
  },
  {
    id: 2,
    name: "Kristin Watson",
    image: "/placeholder.svg",
    quantity: 1,
    price: "$50.47",
  },
  {
    id: 3,
    name: "Kristin Watson",
    image: "/placeholder.svg",
    quantity: 1,
    price: "$50.47",
  },
];

export default function OrderDetailPage() {
  const [sortBy, setSortBy] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Same as OrderListPage */}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}

        {/* Main Content Area */}
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/admin" className="text-gray-500 hover:text-gray-900">
                Dashboard
              </Link>
              <span className="text-gray-500">/</span>
              <Link
                href="/admin/orders"
                className="text-gray-500 hover:text-gray-900"
              >
                Order
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-gray-900">Order Detail</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium">All item</h2>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="all">Sort</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>

                <div className="space-y-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">Product name</h3>
                            <p className="text-sm text-gray-600">{item.name}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">Price</div>
                            <p className="text-sm text-gray-600">
                              {item.price}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Totals */}
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>$70.13</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (GST):</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between font-medium pt-4 border-t">
                    <span>Total price:</span>
                    <span className="text-orange-500">$90.58</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="font-medium mb-4">Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order ID</span>
                    <span>#192847</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date</span>
                    <span>20 Nov 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total</span>
                    <span className="text-orange-500">$948.5</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="font-medium mb-4">Shipping Address</h2>
                <p className="text-sm text-gray-600">
                  3517 W. Gray St. Utica, Pennsylvania 57867
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="font-medium mb-4">Payment Method</h2>
                <p className="text-sm text-gray-600">
                  Pay on Delivery (Cash/Card). Cash on delivery (COD) available.
                  Card/Net banking acceptance subject to device availability.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="font-medium mb-4">Expected Date Of Delivery</h2>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-500">20 Nov 2023</span>
                  <button className="text-blue-600 text-sm hover:underline">
                    Track order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
