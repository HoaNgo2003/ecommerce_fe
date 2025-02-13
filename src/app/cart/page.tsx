"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, Info, Search, ShoppingCart } from "lucide-react";

// Mock cart data - replace with real data fetching
const cartItem = {
  seller: {
    name: "St Luke Gardens-Anthropology Store",
    rating: "100% positive feedback",
    image: "/placeholder.svg",
  },
  product: {
    title:
      "Men's Vintage Nike All Court Shoes 8.5 Made In Taiwan 80s Canvas Blue Prop",
    price: 300.0,
    shipping: 99.89,
    image: "/placeholder.svg",
    isLastOne: true,
  },
};

const relatedItems = [
  {
    title:
      "Vintage 80s Adidas Boston Running Shoes Womens 9 Rare Taiwan Original",
    price: "3,323,454.00 VND",
    image: "/placeholder.svg",
  },
  {
    title:
      "Deadstock Vintage 1994 Nike Wimbledon Classic II Tennis 9 US Shoe Sneaker",
    price: "15,283,697.00 VND",
    image: "/placeholder.svg",
  },
  {
    title: "Nike Court Vintage Pants Gray Made in Taiwan Polyester Mens Size L",
    price: "1,431,496.00 VND",
    image: "/placeholder.svg",
  },
  {
    title: "Converse All Star Made in USA 1980's NEW! TEALSYELLOW (10 US)",
    price: "9,510,924.00 VND",
    image: "/placeholder.svg",
  },
];

export default function CartPage() {
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
            <Link href="/ship-to">Ship to</Link>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Shopping cart</h1>
          <Link
            href="/feedback"
            className="text-sm text-blue-600 hover:underline"
          >
            Send Us Your Comments
          </Link>
        </div>

        {/* Sign in notification */}
        <div className="bg-blue-600 text-white p-4 rounded-md mb-6 flex items-center gap-2">
          <span>
            You&apos;re signed out right now. To save these items or see your
            previously saved items,
          </span>
          <Link href="/signin" className="underline font-medium">
            sign in
          </Link>
          .
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border rounded-lg p-6">
              {/* Seller Info */}
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src={cartItem.seller.image || "/placeholder.svg"}
                  alt={cartItem.seller.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <Link href="#" className="font-medium hover:underline">
                    {cartItem.seller.name}
                  </Link>
                  <div className="text-sm text-gray-600">
                    {cartItem.seller.rating}
                  </div>
                </div>
              </div>

              {/* Cart Item */}
              <div className="flex gap-6">
                <div className="w-32 h-32 relative">
                  <Image
                    src={cartItem.product.image || "/placeholder.svg"}
                    alt={cartItem.product.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      {cartItem.product.isLastOne && (
                        <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mb-2">
                          LAST ONE
                        </span>
                      )}
                      <h3 className="font-medium hover:underline">
                        <Link href="#">{cartItem.product.title}</Link>
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        US ${cartItem.product.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        + US ${cartItem.product.shipping.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label htmlFor="quantity" className="text-sm">
                        Qty
                      </label>
                      <select
                        id="quantity"
                        className="border rounded px-2 py-1 text-sm w-16"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-600">
                      eBay International Shipping
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <button className="text-blue-600 hover:underline text-sm">
                      Save for later
                    </button>
                    <button className="text-blue-600 hover:underline text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <button className="mt-6 text-blue-600 hover:underline text-sm flex items-center gap-1">
                Request combined shipping
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Item (1)</span>
                  <span>US ${cartItem.product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1">
                    <span>Shipping to</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <span>US ${cartItem.product.shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span>
                      US $
                      {(
                        cartItem.product.price + cartItem.product.shipping
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white rounded-full py-3 mt-6 hover:bg-blue-700">
                Go to checkout
              </button>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <Image
                  src="/placeholder.svg"
                  alt="Protection"
                  width={16}
                  height={16}
                />
                <span>Purchase protected by</span>
                <Link href="#" className="text-blue-600 hover:underline">
                  eBay Money Back Guarantee
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Explore related items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedItems.map((item, i) => (
              <div key={i}>
                <div className="aspect-square relative mb-3">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <h3 className="text-sm hover:underline">
                  <Link href="#">{item.title}</Link>
                </h3>
                <div className="text-sm mt-1">{item.price}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
