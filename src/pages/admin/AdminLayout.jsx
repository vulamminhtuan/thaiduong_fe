import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";


function AdminLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar bên trái */}
      <AdminSidebar />

      {/* Phần nội dung bên phải */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <AdminHeader />

        {/* Main content */}
        <main className="p-6 bg-gray-100 min-h-screen"><Outlet /></main>
      </div>
    </div>
  );
}

export default AdminLayout;
