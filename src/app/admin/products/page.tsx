"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit2, Eye, Search, Info, Plus } from "lucide-react";

// Mock product data
const products = [
  {
    id: "#7712309",
    name: "Dog Food, Chicken & Chicken Liver Recipe...",
    image: "/placeholder.svg",
    price: 1452.5,
    quantity: 1638,
    sale: 20,
    stock: "Out of stock",
    startDate: 28672.36,
  },
  {
    id: "#7712309",
    name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
    image: "/placeholder.svg",
    price: 1452.5,
    quantity: 1638,
    sale: 20,
    stock: "Out of stock",
    startDate: 28672.36,
  },
  {
    id: "#7712309",
    name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger...",
    image: "/placeholder.svg",
    price: 1452.5,
    quantity: 1638,
    sale: 20,
    stock: "Out of stock",
    startDate: 28672.36,
  },
  {
    id: "#7712309",
    name: "Milk-Bone Mini's Flavor Snacks Dog Treats, 15 Ounce",
    image: "/placeholder.svg",
    price: 1452.5,
    quantity: 1638,
    sale: 20,
    stock: "Out of stock",
    startDate: 28672.36,
  },
  {
    id: "#7712309",
    name: "Milk-Bone Mini's Flavor Snacks Dog Treats, 15 Ounce",
    image: "/placeholder.svg",
    price: 1452.5,
    quantity: 1638,
    sale: 20,
    stock: "Out of stock",
    startDate: 28672.36,
  },
  {
    id: "#7712309",
    name: "Weruva Pumpkin Patch Up! Dog & Cat Food...",
    image: "/placeholder.svg",
    price: 1452.5,
    quantity: 1638,
    sale: 20,
    stock: "Out of stock",
    startDate: 28672.36,
  },
  {
    id: "#7712309",
    name: "Kristin Watson",
    image: "/placeholder.svg",
    price: 1452.5,
    quantity: 1638,
    sale: 20,
    stock: "Out of stock",
    startDate: 28672.36,
  },
];

export default function ProductListPage() {
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
              href="/admin/ecommerce"
              className="text-gray-500 hover:text-gray-900"
            >
              Ecommerce
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-900">Product List</span>
          </div>

          <div className="bg-white rounded-lg p-6">
            {/* Search Tip */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-blue-600">
                <Info className="w-5 h-5" />
                <p>
                  Tip search by Product ID: Each product is provided with a
                  unique ID, which you can rely on to find the exact product you
                  need.
                </p>
              </div>
            </div>

            {/* Table Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Showing</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span className="text-sm text-gray-500">entries</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search here..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <Link
                  href="/admin/products/add"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add new
                </Link>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-medium">Product</th>
                    <th className="text-left py-4 px-4 font-medium">
                      Product ID
                    </th>
                    <th className="text-left py-4 px-4 font-medium">Price</th>
                    <th className="text-left py-4 px-4 font-medium">
                      Quantity
                    </th>
                    <th className="text-left py-4 px-4 font-medium">Sale</th>
                    <th className="text-left py-4 px-4 font-medium">Stock</th>
                    <th className="text-left py-4 px-4 font-medium">
                      Start date
                    </th>
                    <th className="text-left py-4 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 relative">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{product.id}</td>
                      <td className="py-4 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-4 px-4">{product.quantity}</td>
                      <td className="py-4 px-4">{product.sale}%</td>
                      <td className="py-4 px-4">
                        <span className="text-orange-500">{product.stock}</span>
                      </td>
                      <td className="py-4 px-4">${product.startDate}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:text-blue-600">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="p-1 hover:text-blue-600">
                            <Edit2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
