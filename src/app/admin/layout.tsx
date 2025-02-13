"use client";

import { useState, type ReactNode } from "react";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar open={sidebarOpen} />
      <div className="flex-1">
        <AdminHeader
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        {children}
      </div>
    </div>
  );
}
