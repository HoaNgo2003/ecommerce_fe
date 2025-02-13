"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Upload } from "lucide-react";

type ProductImage = {
  url: string;
  count?: number;
};

export default function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("EU - 44");
  const [productDate, setProductDate] = useState("");
  const [images, setImages] = useState<ProductImage[]>([
    { url: "/placeholder.svg" },
    { url: "/placeholder.svg", count: 5 },
  ]);

  const sizes = [
    "EU - 38.5",
    "EU - 39",
    "EU - 40",
    "EU - 41.5",
    "EU - 42",
    "EU - 43",
    "EU - 44",
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
      }));
      setImages([...images, ...newImages]);
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
            <span className="text-gray-900">Add Product</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-6">
              <div>
                <label className="block mb-2">
                  Product name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Do not exceed 20 characters when entering the product name.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Choose category</option>
                    <option value="shoes">Shoes</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2">
                  Brand <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Choose brand</option>
                  <option value="nike">Nike</option>
                  <option value="adidas">Adidas</option>
                  <option value="puma">Puma</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Do not exceed 100 characters when entering the product
                  description.
                </p>
              </div>
            </div>

            {/* Image Upload and Sizes */}
            <div className="space-y-6">
              <div>
                <h2 className="font-medium mb-4">Upload images</h2>
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square relative rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {image.count && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          x{image.count}
                        </div>
                      )}
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-blue-500 hover:text-blue-500">
                    <Upload className="w-8 h-8 mb-2" />
                    <p className="text-xs text-center">
                      Drop your images here
                      <br />
                      or click to browse
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  You need to add at least 4 images. Pay attention to the
                  quality of the pictures you add, comply with the background
                  color standards. Pictures must be in certain dimensions.
                  Notice that the product shows all the details
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h2 className="font-medium mb-4">Add size</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg text-sm ${
                          selectedSize === size
                            ? "bg-blue-50 border-blue-500 text-blue-600"
                            : "hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="font-medium mb-4">Product date</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      value={productDate}
                      onChange={(e) => setProductDate(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add product
                </button>
                <button className="px-8 py-2 border rounded-lg hover:bg-gray-50">
                  Save product
                </button>
                <button className="px-8 py-2 border rounded-lg hover:bg-gray-50">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
