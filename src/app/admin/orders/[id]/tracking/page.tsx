"use client";

import Image from "next/image";
import Link from "next/link";

// Mock tracking data
const trackingSteps = [
  {
    title: "Receiving orders",
    time: "05:43 AM",
    completed: true,
  },
  {
    title: "Order processing",
    time: "01:21 PM",
    completed: true,
  },
  {
    title: "Being delivered",
    time: "Processing",
    completed: true,
  },
  {
    title: "Delivered",
    time: "Pending",
    completed: false,
  },
];

const trackingHistory = [
  {
    date: "20 Nov 2023",
    time: "2:30 PM",
    description: "The sender is preparing the goods",
    location: "2715 Ash Dr. San Jose, South Dakota 83475",
  },
  {
    date: "20 Nov 2023",
    time: "01:00 PM",
    description: "The order has arrived at the post office",
    location: "3517 W. Gray St. Utica, Pennsylvania 57867",
  },
  {
    date: "21 Nov 2023",
    time: "03:58 AM",
    description: "The carrier is picking up the goods",
    location: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
  },
  {
    date: "22 Nov 2023",
    time: "06:26 PM",
    description: "The order has been shipped",
    location: "4140 Parker Rd. Allentown, New Mexico 31134",
  },
  {
    date: "22 Nov 2023",
    time: "03:45 PM",
    description: "Your order will be delivered to you in 30 minutes",
    location: "8502 Preston Rd. Inglewood, Maine 98380",
  },
  {
    date: "23 Nov 2023",
    time: "12:21 AM",
    description: "The order has been delivered successfully",
    location: "3891 Ranchview Dr. Richardson, California 62639",
  },
];

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}

        {/* Main Content Area */}
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
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
            <span className="text-gray-900">Order Tracking</span>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            {/* Product Info */}
            <div className="flex items-start gap-8 mb-8">
              <div className="w-48 h-48 relative">
                <Image
                  src="/placeholder.svg"
                  alt="Product"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-4">
                  Pouch Pocket Hoodie Orange
                </h1>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-8">
                    <div>
                      <span className="text-gray-600">Order ID:</span>
                      <span className="ml-2">#192847</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Brand:</span>
                      <span className="ml-2">20 Nov 2023</span>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <span className="text-gray-600">Order Placed:</span>
                      <span className="ml-2">20 Nov 2023</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Quantity:</span>
                      <span className="ml-2">1</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                    View shop
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View product
                  </button>
                </div>
              </div>
            </div>

            {/* Tracking Progress */}
            <div className="mb-8">
              <h2 className="font-medium mb-4">Detail</h2>
              <p className="text-sm text-gray-600 mb-6">
                Your items is on the way. Tracking information will be available
                within 24 hours.
              </p>

              <div className="relative">
                <div className="flex justify-between mb-2">
                  {trackingSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center relative z-10"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        ✓
                      </div>
                      <div className="text-center mt-2">
                        <div className="font-medium text-sm">{step.title}</div>
                        <div className="text-xs text-gray-500">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200 -z-10">
                  <div className="h-full bg-blue-600 w-3/4" />
                </div>
              </div>
            </div>

            {/* Tracking History */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium">Date</h2>
                <h2 className="font-medium">Time</h2>
                <h2 className="font-medium">Description</h2>
                <h2 className="font-medium">Location</h2>
              </div>
              <div className="space-y-4">
                {trackingHistory.map((event, index) => (
                  <div key={index} className="grid grid-cols-4 text-sm">
                    <div>{event.date}</div>
                    <div>{event.time}</div>
                    <div>{event.description}</div>
                    <div>{event.location}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
