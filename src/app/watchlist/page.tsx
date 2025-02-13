"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Filter,
  Heart,
  MoreHorizontal,
  ShoppingCart,
  Trash2,
} from "lucide-react";

// Mock watchlist data
const watchlistItems = [
  {
    id: 1,
    title: "Nike Air Max 97 'Silver Bullet' 2022 - Size US 9",
    image: "/placeholder.svg",
    price: {
      current: 199.99,
      original: 220.0,
      discount: 9,
    },
    seller: {
      name: "SneakerHub",
      rating: 98.5,
    },
    shipping: 12.99,
    watchers: 45,
    timeLeft: "2d 15h",
    bids: 12,
    isOnSale: true,
    priceDropped: true,
  },
  {
    id: 2,
    title: "Vintage Levi's 501 Original Fit Jeans - Light Wash",
    image: "/placeholder.svg",
    price: {
      current: 89.99,
      original: 89.99,
    },
    seller: {
      name: "VintageDenim",
      rating: 99.1,
    },
    shipping: 8.99,
    watchers: 23,
    timeLeft: "6d 4h",
    bids: 0,
    isOnSale: false,
    priceDropped: false,
  },
  {
    id: 3,
    title: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    image: "/placeholder.svg",
    price: {
      current: 278.0,
      original: 349.99,
      discount: 21,
    },
    seller: {
      name: "ElectronicsPlus",
      rating: 99.8,
    },
    shipping: "Free",
    watchers: 156,
    timeLeft: "1d 8h",
    bids: 25,
    isOnSale: true,
    priceDropped: true,
  },
  // Add more items as needed
];

export default function WatchlistPage() {
  const [sortBy, setSortBy] = useState("ending-soon");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="h-14 flex items-center justify-between">
              <h1 className="text-xl font-semibold">Watchlist</h1>
              <div className="flex items-center gap-4">
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Edit
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-0 focus:ring-0"
                >
                  <option value="ending-soon">Time: ending soonest</option>
                  <option value="newly-listed">Time: newly listed</option>
                  <option value="price-low">
                    Price + Shipping: lowest first
                  </option>
                  <option value="price-high">
                    Price + Shipping: highest first
                  </option>
                  <option value="distance">Distance: nearest first</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                {watchlistItems.length} items
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="grid grid-cols-4 gap-4 pt-4">
                <select className="text-sm border rounded-md">
                  <option>All Categories</option>
                  <option>Fashion</option>
                  <option>Electronics</option>
                  <option>Home & Garden</option>
                </select>
                <select className="text-sm border rounded-md">
                  <option>All Conditions</option>
                  <option>New</option>
                  <option>Used</option>
                </select>
                <select className="text-sm border rounded-md">
                  <option>All Prices</option>
                  <option>Under $25</option>
                  <option>$25 to $100</option>
                  <option>Over $100</option>
                </select>
                <select className="text-sm border rounded-md">
                  <option>All Items</option>
                  <option>Auction</option>
                  <option>Buy It Now</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Watchlist Items */}
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            {watchlistItems.map((item) => (
              <div key={item.id} className="bg-white border rounded-lg p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-40 h-40 relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                    {item.priceDropped && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Price Drop
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium hover:text-blue-600">
                          <Link href={`/products/${item.id}`}>
                            {item.title}
                          </Link>
                        </h3>
                        <div className="text-sm text-gray-600 mt-1">
                          Seller: {item.seller.name} · {item.seller.rating}%
                          Positive feedback
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-semibold">
                          US ${item.price.current}
                        </span>
                        {item.price.discount && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              US ${item.price.original}
                            </span>
                            <span className="text-sm text-red-500">
                              {item.price.discount}% OFF
                            </span>
                          </>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {item.shipping === "Free"
                          ? "Free Shipping"
                          : `+US $${item.shipping} shipping`}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                      {item.bids > 0 && <div>{item.bids} bids</div>}
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-gray-400" />
                        {item.watchers}
                      </div>
                      <div>Time left: {item.timeLeft}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                      <button className="border px-4 py-2 rounded-full hover:bg-gray-50 flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
