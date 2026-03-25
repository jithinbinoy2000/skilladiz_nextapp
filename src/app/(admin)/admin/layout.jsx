"use client";

import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { Outfit } from "next/font/google";
import React from "react";

export const dynamic = "force-dynamic";

function AdminLayoutShell({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen bg-white dark:bg-black xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}

const outfit = Outfit({
  subsets: ["latin"],
});
export default function AdminLayout({ children }) {
  return (
   <div className={`${outfit.className} dark:bg-gray-900`}>
      <ThemeProvider>
        <SidebarProvider>
          <AdminLayoutShell>{children}</AdminLayoutShell>
        </SidebarProvider>
      </ThemeProvider>
   </div>
  );
}
