"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  MessageCircle,
  Moon,
  Search,
  Share2,
  Eye,
} from "lucide-react";
import { Truck, RefreshCw, Shield } from "lucide-react";

const product = {
  name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
  price: 28.0,
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
  colors: [
    { name: "Orange", value: "#FFA500" },
    { name: "Blue", value: "#0000FF" },
    { name: "Gold", value: "#FFD700" },
  ],
  sizes: ["S", "M", "L", "XL"],
  delivery: {
    international: "12-26 days",
    domestic: "3-5 days",
  },
  return: {
    period: "30 days",
    note: "of purchase. Duties & taxes are non-refundable.",
  },
};

export default function ProductDetailPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header - Same as ProductListPage */}
        <header className="bg-white shadow-md p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <button className="bg-gray-200 p-2 rounded hover:bg-gray-300">
                <Search className="w-5 h-5" />
              </button>
              <button className="bg-gray-200 p-2 rounded hover:bg-gray-300">
                <Moon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

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
            <span className="text-gray-900">Product Detail</span>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-12 gap-8">
              {/* Product Images */}
              <div className="col-span-7">
                <div className="flex gap-4">
                  {/* Thumbnails */}
                  <div className="w-24 space-y-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-full aspect-square relative border rounded-lg overflow-hidden ${
                          selectedImage === index
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product view ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Main Image */}
                  <div className="flex-1 aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src={product.images[selectedImage] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="col-span-5">
                <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                <div className="text-xl font-bold mb-6">
                  ${product.price.toFixed(2)}
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-medium">Color:</label>
                    <span className="text-gray-600">{selectedColor.name}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor.name === color.name
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color.value }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-medium">Size:</label>
                    <span className="text-gray-600">{selectedSize}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-lg border ${
                          selectedSize === size
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="font-medium block mb-2">Quantity</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border rounded-lg flex items-center justify-center hover:border-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(1, Number.parseInt(e.target.value) || 1)
                        )
                      }
                      className="w-16 h-10 border rounded-lg text-center"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border rounded-lg flex items-center justify-center hover:border-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                    Add to cart - ${(product.price * quantity).toFixed(2)}
                  </button>
                  <button className="w-full bg-[#0070BA] text-white py-3 rounded-lg hover:bg-[#003087]">
                    Buy with PayPal
                  </button>
                  <button className="w-full text-gray-500 hover:text-gray-600">
                    More payment options
                  </button>
                </div>

                {/* Product Actions */}
                <div className="flex items-center gap-6 mt-6 text-sm">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <Eye className="w-4 h-4" />
                    Compare color
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <MessageCircle className="w-4 h-4" />
                    Ask a question
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>

                {/* Delivery & Return */}
                <div className="border-t mt-6 pt-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">Estimate delivery times</p>
                      <p className="text-sm text-gray-600">
                        {product.delivery.international} (International),
                        <br />
                        {product.delivery.domestic} (United States)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <RefreshCw className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Return within {product.return.period}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.return.note}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="border-t mt-6 pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Guarantee Safe Checkout
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src="/placeholder.svg"
                      alt="Visa"
                      width={40}
                      height={25}
                    />
                    <Image
                      src="/placeholder.svg"
                      alt="PayPal"
                      width={40}
                      height={25}
                    />
                    <Image
                      src="/placeholder.svg"
                      alt="American Express"
                      width={40}
                      height={25}
                    />
                    <Image
                      src="/placeholder.svg"
                      alt="Mastercard"
                      width={40}
                      height={25}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
