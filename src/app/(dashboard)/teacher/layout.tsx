"use client";

import Navbar from "@/components/layout/Navbar";
import { TeacherSidebar } from "./TeacherSidebar"; 

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
    <div className="flex h-screen w-full bg-white overflow-hidden text-left">
      
      {/* السايد بار الآن على اليسار بفضل الترتيب الطبيعي لـ Flexbox */}
      <aside className="h-full w-72 flex-shrink-0 hidden md:block">
        <TeacherSidebar />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <header className="w-full bg-white border-b sticky top-0 z-20">
          <Navbar />
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-10">
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

