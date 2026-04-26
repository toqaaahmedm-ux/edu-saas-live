"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  PlusCircle, 
  Users, 
  BarChart3, 
  Settings,
  LogOut 
} from "lucide-react";

export function TeacherSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/teacher" },
    { label: "My Courses", icon: <BookOpen size={20} />, href: "/teacher/courses" },
    { label: "New Course", icon: <PlusCircle size={20} />, href: "/teacher/courses/new" },
    { label: "Students", icon: <Users size={20} />, href: "/teacher/students" },
    { label: "Analytics", icon: <BarChart3 size={20} />, href: "/teacher/analytics" },
    { label: "Settings", icon: <Settings size={20} />, href: "/teacher/settings" },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100">
      {/* Sidebar Header */}
      <div className="p-8">
        <h1 className="text-2xl font-black text-blue-600 tracking-tight">
          Teacher<span className="text-slate-800">Hub</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                  : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-4 mt-auto border-t border-slate-50">
        <button className="w-full flex items-center gap-4 px-4 py-3.5 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
