import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, ChevronDown, Search } from "lucide-react";
import CartIcon from "@/components/CartIcon";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="border-b">
        <div className="container mx-auto flex items-center justify-between py-2 text-sm px-4">
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
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/daily-deals">Daily Deals</Link>
              <Link href="/brand-outlet">Brand Outlet</Link>
              <Link href="/gift-cards">Gift Cards</Link>
              <Link href="/help">Help & Contact</Link>
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
              <CartIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KpNlpPkfs3C7rJC3mEAfzXApQDH0Ep.png"
                alt="Logo"
                width={120}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <div className="flex flex-1 items-center gap-2">
              <select className="w-[180px] h-10 border rounded-md px-3">
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Garden</option>
              </select>
              <div className="flex flex-1 items-center">
                <input
                  type="search"
                  placeholder="Search for anything"
                  className="w-full h-10 border rounded-l-md px-4"
                />
                <button className="h-10 px-6 bg-blue-600 text-white rounded-r-md flex items-center gap-2 hover:bg-blue-700">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </button>
              </div>
              <button className="text-sm text-blue-600 hover:underline">
                Advanced
              </button>
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
