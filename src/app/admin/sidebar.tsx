"use client";

import Link from "next/link";
import {
  BarChart2,
  LayoutGrid,
  Tag,
  Package,
  ShoppingBag,
  User,
  Users,
  ImageIcon,
  MapPin,
} from "lucide-react";

interface AdminSidebarProps {
  open: boolean;
}

export default function AdminSidebar({ open }: AdminSidebarProps) {
  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-white border-r transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="h-16 border-b flex items-center px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          {open && <span className="font-bold text-xl">Remos</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-8">
          <div>
            <p className="text-xs text-gray-400 mb-4">MAIN HOME</p>
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900 py-2"
            >
              <LayoutGrid className="w-5 h-5" />
              {open && <span>Dashboard</span>}
            </Link>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-4">ALL PAGE</p>
            <div className="space-y-2">
              <Link
                href="/admin/products"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <Tag className="w-5 h-5" />
                {open && <span>Products</span>}
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <Tag className="w-5 h-5" />
                {open && <span>Category</span>}
              </Link>
              <Link
                href="/admin/attributes"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <Package className="w-5 h-5" />
                {open && <span>Attributes</span>}
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <ShoppingBag className="w-5 h-5" />
                {open && <span>Order</span>}
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <User className="w-5 h-5" />
                {open && <span>User</span>}
              </Link>
              <Link
                href="/admin/roles"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <Users className="w-5 h-5" />
                {open && <span>Roles</span>}
              </Link>
              <Link
                href="/admin/gallery"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <ImageIcon className="w-5 h-5" />
                {open && <span>Gallery</span>}
              </Link>
              <Link
                href="/admin/reports"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <BarChart2 className="w-5 h-5" />
                {open && <span>Report</span>}
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-4">SETTING</p>
            <Link
              href="/admin/location"
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900 py-2"
            >
              <MapPin className="w-5 h-5" />
              {open && <span>Location</span>}
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  );
}
