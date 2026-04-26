"use client";

import Navbar from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Direction set to LTR (default) and removed dir="rtl"
    <div className="flex h-screen w-full bg-white overflow-hidden">
      
      {/* Sidebar - Fixed on the Left */}
      <aside className="h-full w-64 flex-shrink-0 border-r border-gray-100 bg-white hidden md:block">
        <Sidebar />
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        
        {/* Top Header */}
        <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
          <Navbar />
        </header>

        {/* Main Content - Adjusted padding and background */}
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB] p-4 md:p-8">
          
          {/* ✅ Max-width set to none to utilize full space without large margins */}
          <div className="w-full max-w-none mx-0 animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

