"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Heart,
  MessageCircle,
  Search,
  Share2,
  ShoppingCart,
} from "lucide-react";

const sellerData = {
  id: "hype-stock",
  name: "Hype_Stock",
  banner: "/placeholder.svg?height=300&width=1200",
  avatar: "/placeholder.svg?height=80&width=80",
  stats: {
    feedback: "99% positive feedback",
    itemsSold: "2.5K items sold",
    followers: "240 followers",
  },
};

const categories = [
  {
    id: "flats",
    name: "Flats",
    image: "/placeholder.svg",
    itemCount: 45,
  },
  {
    id: "athletic-shoes",
    name: "Athletic Shoes",
    image: "/placeholder.svg",
    itemCount: 128,
  },
  {
    id: "dress-shoes",
    name: "Dress Shoes",
    image: "/placeholder.svg",
    itemCount: 67,
  },
  {
    id: "sneakers",
    name: "Sneakers",
    image: "/placeholder.svg",
    itemCount: 89,
  },
];

const featuredItems = [
  {
    id: 1,
    title: "Adidas SL 72 Vintage Navy Yellow Sneakers",
    price: 129.99,
    image: "/placeholder.svg",
    condition: "New with box",
    shipping: "Free shipping",
    watchers: 14,
  },
  {
    id: 2,
    title: "Adidas Dragon Vintage Blue Yellow Classic",
    price: 149.99,
    image: "/placeholder.svg",
    condition: "New with box",
    shipping: "Free shipping",
    watchers: 8,
  },
  // Add more items as needed
];

export default function SellerStorePage() {
  const [activeTab, setActiveTab] = useState("shop");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-3 text-sm">
          <div className="flex items-center gap-4">
            <span>
              Hi!{" "}
              <Link href="/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>{" "}
              or{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                register
              </Link>
            </span>
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
              <Bell className="h-5 w-5 cursor-pointer" />
              <ShoppingCart className="h-5 w-5 cursor-pointer" />
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
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Garden</option>
              </select>
              <div className="flex flex-1 items-center">
                <input
                  type="search"
                  placeholder="Search for anything"
                  className="flex-1 h-11 border rounded-l-md px-4"
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
          {[
            "Explore",
            "Saved",
            "Electronics",
            "Motors",
            "Fashion",
            "Collectibles and Art",
            "Sports",
            "Health & Beauty",
            "Industrial equipment",
            "Home & Garden",
            "Deals",
            "Sell",
          ].map((category) => (
            <Link
              key={category}
              href={`/${category.toLowerCase()}`}
              className="shrink-0 hover:text-blue-600 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </nav>

      {/* Banner */}
      <div className="relative h-[300px] w-full">
        <Image
          src={sellerData.banner || "/placeholder.svg"}
          alt="Store banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Seller Profile */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 -mt-8 pb-6">
            <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white">
              <Image
                src={sellerData.avatar || "/placeholder.svg"}
                alt={sellerData.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{sellerData.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <span>{sellerData.stats.feedback}</span>
                <span>·</span>
                <span>{sellerData.stats.itemsSold}</span>
                <span>·</span>
                <span>{sellerData.stats.followers}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50">
                <MessageCircle className="w-4 h-4" />
                Contact
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50">
                <Heart className="w-4 h-4" />
                Save Seller
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <span className="font-medium">Categories</span>
              </button>
              <nav className="flex items-center gap-6">
                {["Shop", "Sale", "About", "Feedback"].map((tab) => (
                  <button
                    key={tab}
                    className={`text-sm ${
                      activeTab === tab.toLowerCase()
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            <div className="relative w-80">
              <input
                type="search"
                placeholder="Search all items"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Featured Categories */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Featured categories</h2>
          <div className="grid grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/seller/${sellerData.id}/category/${category.id}`}
                className="group"
              >
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-600">
                    {category.itemCount} items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Items */}
        <section>
          <h2 className="text-xl font-bold mb-6">Featured items</h2>
          <div className="grid grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <div key={item.id} className="group">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3">
                  <h3 className="font-medium group-hover:text-blue-600">
                    <Link href={`/item/${item.id}`}>{item.title}</Link>
                  </h3>
                  <div className="mt-1">
                    <div className="font-medium">
                      US ${item.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.condition}
                    </div>
                    <div className="text-sm text-gray-600">{item.shipping}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.watchers} watchers
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
