"use client";

import { Bell, ChevronDown, Search, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartIcon } from "@/components/CartIcon";

const categories = ["Book", "Phone", "Clothes"];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-3 text-sm">
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <span>
                Welcome back!{" "}
                <button
                  onClick={handleLogout}
                  className="text-blue-600 hover:underline flex items-center"
                >
                  Logout <LogOut className="h-4 w-4 ml-1" />
                </button>
              </span>
            ) : (
              <span>
                Hi!{" "}
                <Link href="/signin" className="text-blue-600 hover:underline">
                  Sign in
                </Link>{" "}
                or{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  register
                </Link>
              </span>
            )}
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
              <Bell className="h-5 w-5" />
              <CartIcon />
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
                <option value="book">Book</option>
                <option value="clothes">Clothes</option>
                <option value="phone">Phone</option>
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
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 flex items-center gap-8 overflow-x-auto py-4 text-sm">
          {categories.map((category) => (
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

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 grid gap-12 py-16 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Limitless love, limitless luxury
            </h1>
            <p className="text-xl text-gray-500">
              Save 15% on luxury fashion accessories for Valentine&apos;s Day.
            </p>
            <div>
              <button className="bg-black text-white hover:bg-gray-800 h-12 px-8 text-lg rounded-md transition-colors">
                Shop luxury
              </button>
            </div>
            <p className="text-sm text-gray-500">*See Terms & Conditions.</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src="https://i.ebayimg.com/images/g/~CsAAOSwJJFml9ye/s-l640.webp"
                  alt="Luxury item"
                  width={200}
                  height={200}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-3xl font-bold tracking-tight">
            Explore Popular Categories
          </h2>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {[
              { title: "Book", image: "book" },
              { title: "Phone", image: "phone" },
              { title: "Clothes", image: "clothes" },
            ].map((category, i) => (
              <Link
                key={i}
                href={`/products/${category.title.toLowerCase()}`}
                className="group relative"
              >
                <div className="aspect-square overflow-hidden rounded-full bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={`/images/${category.image}.jpeg`}
                    alt={category.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-center text-sm font-medium">
                  {category.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
