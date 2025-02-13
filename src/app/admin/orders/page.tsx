"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil, Trash2, Download } from "lucide-react";

// Mock order data
const orders = [
  {
    id: "#7712309",
    product: {
      name: "Dog Food, Chicken & Chicken Liver Recipe",
      image: "/placeholder.svg",
    },
    customer: "Kristin Watson",
    price: "$1,452.500",
    quantity: 1638,
    payment: 20,
    status: "success",
    tracking: "Tracking",
  },
  {
    id: "#7712309",
    product: {
      name: "Grain Free Dry Dog Food",
      image: "/placeholder.svg",
    },
    customer: "Kristin Watson",
    price: "$1,452.500",
    quantity: 1638,
    payment: 20,
    status: "pending",
    tracking: "Tracking",
  },
  {
    id: "#7712309",
    product: {
      name: "Weruva Pumpkin Patch Up!",
      image: "/placeholder.svg",
    },
    customer: "Kristin Watson",
    price: "$1,452.500",
    quantity: 1638,
    payment: 20,
    status: "success",
    tracking: "Tracking",
  },
  {
    id: "#7712309",
    product: {
      name: "Milk-Bone Mini's Flavor Snacks",
      image: "/placeholder.svg",
    },
    customer: "Kristin Watson",
    price: "$1,452.500",
    quantity: 1638,
    payment: 20,
    status: "success",
    tracking: "Tracking",
  },
  {
    id: "#7712309",
    product: {
      name: "Milk-Bone Mini's Flavor Snacks",
      image: "/placeholder.svg",
    },
    customer: "Kristin Watson",
    price: "$1,452.500",
    quantity: 1638,
    payment: 20,
    status: "cancel",
    tracking: "Tracking",
  },
];

export default function OrderListPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "pending":
        return "text-gray-500";
      case "cancel":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}

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
              <span className="text-gray-900">Order List</span>
            </div>
            <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">
              <Download className="w-4 h-4" />
              Export all order
            </button>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-6 font-medium">Product</th>
                    <th className="text-left py-4 px-6 font-medium">
                      Order ID
                    </th>
                    <th className="text-left py-4 px-6 font-medium">Price</th>
                    <th className="text-left py-4 px-6 font-medium">
                      Quantity
                    </th>
                    <th className="text-left py-4 px-6 font-medium">Payment</th>
                    <th className="text-left py-4 px-6 font-medium">Status</th>
                    <th className="text-left py-4 px-6 font-medium">
                      Tracking
                    </th>
                    <th className="text-left py-4 px-6 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={order.product.image || "/placeholder.svg"}
                            alt={order.product.name}
                            width={48}
                            height={48}
                            className="rounded-lg"
                          />
                          <div className="font-medium">{order.customer}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">{order.id}</td>
                      <td className="py-4 px-6">{order.price}</td>
                      <td className="py-4 px-6">{order.quantity}</td>
                      <td className="py-4 px-6">{order.payment}</td>
                      <td className="py-4 px-6">
                        <span className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          href={`/admin/orders/${"order.id"}/tracking`}
                          className="text-blue-600 hover:underline"
                        >
                          {order.tracking}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:text-blue-600">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="p-1 hover:text-blue-600">
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button className="p-1 hover:text-red-600">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-gray-500">Showing 10 entries</div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border hover:border-blue-600 hover:text-blue-600">
                  &lt;
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border hover:border-blue-600 hover:text-blue-600">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border hover:border-blue-600 hover:text-blue-600">
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border hover:border-blue-600 hover:text-blue-600">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
