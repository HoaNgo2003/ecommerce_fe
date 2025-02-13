"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil, Trash2, Plus, Search } from "lucide-react";

// Mock category data
const categories = [
  {
    name: "Dried food",
    image: "/placeholder.svg",
    icon: "📦",
    quantity: 1638,
    sale: 20,
    startDate: "20 Nov 2023",
  },
  {
    name: "Wet food",
    image: "/placeholder.svg",
    icon: "🥫",
    quantity: 1638,
    sale: 20,
    startDate: "20 Nov 2023",
  },
  {
    name: "Supplemental food",
    image: "/placeholder.svg",
    icon: "💊",
    quantity: 1638,
    sale: 20,
    startDate: "20 Nov 2023",
  },
  {
    name: "Puppy food",
    image: "/placeholder.svg",
    icon: "🐕",
    quantity: 1638,
    sale: 20,
    startDate: "20 Nov 2023",
  },
  {
    name: "Food for adult dogs",
    image: "/placeholder.svg",
    icon: "🦮",
    quantity: 1638,
    sale: 20,
    startDate: "20 Nov 2023",
  },
  {
    name: "Food for elderly dogs",
    image: "/placeholder.svg",
    icon: "🐕‍🦺",
    quantity: 1638,
    sale: 20,
    startDate: "20 Nov 2023",
  },
  {
    name: "Kitten food",
    image: "/placeholder.svg",
    icon: "🐱",
    quantity: 1638,
    sale: 20,
    startDate: "20 Nov 2023",
  },
  {
    name: "Food for adult cats",
    image: "/placeholder.svg",
    icon: "😺",
    quantity: 1638,
    sale: 20,
    startDate: "20 Nov 2023",
  },
  {
    name: "Food for elderly cats",
    image: "/placeholder.svg",
    icon: "😸",
    quantity: 1638,
    sale: 20,
    startDate: "20 Nov 2023",
  },
  {
    name: "Special pet food",
    image: "/placeholder.svg",
    icon: "🏥",
    quantity: 1638,
    sale: 20,
    startDate: "20 Nov 2023",
  },
];

export default function CategoryListPage() {
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow p-6">
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
                href="/admin/categories/add"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add new
              </Link>
            </div>
          </div>

          {/* Categories Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-medium">Category</th>
                  <th className="text-left py-4 px-4 font-medium">Icon</th>
                  <th className="text-left py-4 px-4 font-medium">Quantity</th>
                  <th className="text-left py-4 px-4 font-medium">Sale</th>
                  <th className="text-left py-4 px-4 font-medium">
                    Start date
                  </th>
                  <th className="text-left py-4 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          width={48}
                          height={48}
                          className="rounded-lg"
                        />
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-2xl">{category.icon}</span>
                    </td>
                    <td className="py-4 px-4">{category.quantity}</td>
                    <td className="py-4 px-4">{category.sale}%</td>
                    <td className="py-4 px-4">{category.startDate}</td>
                    <td className="py-4 px-4">
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
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing 1 to 10 of {categories.length} entries
            </div>
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
  );
}
