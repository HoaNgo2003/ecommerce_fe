"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Grid, Moon, MessageCircle, Search, Upload } from "lucide-react";

export default function AddCategoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle the uploaded files
      console.log("File(s) dropped");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Grid className="w-5 h-5" />
          </button>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Search here..."
                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Moon className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Grid className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 border-l pl-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  alt="Admin"
                  width={32}
                  height={32}
                />
              </div>
              {sidebarOpen && (
                <div className="text-sm">
                  <div className="font-medium">Kristin Watson</div>
                  <div className="text-gray-500">Admin</div>
                </div>
              )}
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
              href="/admin/categories"
              className="text-gray-500 hover:text-gray-900"
            >
              Category
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-900">Add Category</span>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <form className="max-w-2xl">
              <div className="space-y-6">
                {/* Category Name */}
                <div>
                  <label className="block mb-2">
                    Product name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block mb-2">
                    Upload images <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 ${
                      dragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600">
                        Drop your images here or{" "}
                        <button
                          type="button"
                          className="text-blue-600 hover:underline"
                        >
                          click to browse
                        </button>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="block mb-2">
                    Select category icon <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedIcon}
                    onChange={(e) => setSelectedIcon(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select icon</option>
                    <option value="📦">📦 Box</option>
                    <option value="🛍️">🛍️ Shopping Bag</option>
                    <option value="🏷️">🏷️ Tag</option>
                    <option value="📱">📱 Phone</option>
                    <option value="💻">💻 Laptop</option>
                    <option value="👕">👕 Clothing</option>
                    <option value="👟">👟 Shoes</option>
                    <option value="🏠">🏠 Home</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
