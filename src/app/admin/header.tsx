"use client";

import Image from "next/image";
import { Grid, Moon, MessageCircle, Search } from "lucide-react";

interface AdminHeaderProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

export default function AdminHeader({
  sidebarOpen,
  onSidebarToggle,
}: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <button
        onClick={onSidebarToggle}
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
            <Image src="/placeholder.svg" alt="Admin" width={32} height={32} />
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
  );
}
