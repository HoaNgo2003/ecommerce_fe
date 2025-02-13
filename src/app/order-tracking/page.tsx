"use client";

import { useState } from "react";
import {
  ChevronLeft,
  MessageCircle,
  User,
  ShoppingBag,
  Bell,
  Ticket,
  Coins,
} from "lucide-react";
import Link from "next/link";

const orderStatuses = [
  {
    title: "Order Placed",
    date: "17-06-2022",
    time: "17:35",
    completed: true,
    icon: "📝",
  },
  {
    title: "Order Paid",
    date: "18-06-2022",
    time: "17:00",
    completed: true,
    icon: "💳",
  },
  {
    title: "Order Shipped Out",
    date: "19-06-2022",
    time: "10:04",
    completed: true,
    icon: "🚚",
  },
  {
    title: "Order Received",
    date: "21-06-2022",
    time: "08:22",
    completed: true,
    icon: "📦",
  },
  {
    title: "Order Completed",
    date: "21-06-2022",
    time: "23:59",
    completed: true,
    icon: "⭐",
  },
];

const trackingUpdates = [
  {
    date: "22-06-2022",
    time: "10:44",
    status: "Delivered",
    description: "Package has been delivered to recipient",
    isCompleted: true,
  },
  {
    date: "22-06-2022",
    time: "07:31",
    status: "In transit",
    description: "Package is in transit to delivery location",
    isCompleted: true,
  },
  {
    date: "22-06-2022",
    time: "04:45",
    status: "Processing",
    description: "Package is being processed at HKGKM - facility",
    isCompleted: true,
  },
];

export default function OrderTrackingPage() {
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const displayedUpdates = showAllUpdates
    ? trackingUpdates
    : trackingUpdates.slice(0, 3);
  const orderId = "220610H31F2Y7";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r hidden md:block">
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
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="h-14 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/orders"
                  className="flex items-center text-gray-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>BACK</span>
                </Link>
                <div className="text-sm">
                  ORDER ID: <span className="font-medium">{orderId}</span>
                </div>
              </div>
              <div className="text-sm font-medium text-green-600">
                ORDER COMPLETED
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="border-b border-gray-200" />

        <div className="container mx-auto px-4 py-6">
          {/* Order Status Timeline */}
          <div className="bg-white rounded p-6 mb-4">
            <div className="relative">
              <div className="flex justify-between mb-6">
                {orderStatuses.map((status, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                      ${
                        status.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {status.icon}
                    </div>
                    <div className="text-[11px] mt-2 text-center">
                      <div className="font-medium">{status.title}</div>
                      <div className="text-gray-500">{status.date}</div>
                      <div className="text-gray-500">{status.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Connection line */}
              <div className="absolute top-4 left-0 right-0 h-[1px] bg-green-500 -z-10" />
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="border-b border-gray-200 mb-4" />

          {/* Thank you message */}
          <div className="text-center text-sm text-gray-600 mb-4">
            Thank you for shopping with Shopee!
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mb-4">
            <button className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
              Buy Again
            </button>
            <button className="border border-gray-300 py-2 rounded hover:bg-gray-50">
              Contact Seller
            </button>
          </div>

          {/* Dashed line separator */}
          <div className="h-4 relative mb-4">
            <div className="absolute inset-0 flex">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-[1px] flex-1 ${
                    i % 2 === 0 ? "bg-blue-200" : "bg-pink-200"
                  }`}
                  style={{ margin: "0 2px" }}
                />
              ))}
            </div>
          </div>

          {/* Tracking Information */}
          <div className="bg-white rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Delivery Address</h2>
              <div className="text-sm">
                <span className="text-gray-500">Tracking ID: </span>
                <span className="text-orange-500 font-medium">
                  SPX-SPXTH20244404926
                </span>
              </div>
            </div>

            {/* Tracking Updates */}
            <div className="space-y-4">
              {displayedUpdates.map((update, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    {index !== displayedUpdates.length - 1 && (
                      <div className="w-[1px] h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <div className="font-medium text-green-600">
                        {update.status}
                      </div>
                      <div className="text-gray-500">
                        {update.date} {update.time}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {update.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {trackingUpdates.length > 3 && (
              <button
                onClick={() => setShowAllUpdates(!showAllUpdates)}
                className="text-blue-600 hover:underline mt-4 text-sm"
              >
                {showAllUpdates ? "Show Less" : "See More"}
              </button>
            )}
          </div>
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
