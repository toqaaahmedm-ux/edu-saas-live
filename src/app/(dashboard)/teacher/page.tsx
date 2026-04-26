"use client";

import { Users, Video, FilePlus, BarChart3, Plus } from "lucide-react";
import Link from "next/link";

export default function TeacherDashboard() {
  const stats = [
    { label: "Total Students", value: "1,250", icon: <Users />, color: "bg-blue-600" },
    { label: "Published Courses", value: "8", icon: <Video />, color: "bg-purple-600" },
    { label: "Active Quizzes", value: "12", icon: <FilePlus />, color: "bg-orange-600" },
    { label: "Average Rating", value: "4.9", icon: <BarChart3 />, color: "bg-green-600" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 text-left">
      {/* Welcome Header with Quick Action Button */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Welcome back, Doctor 👋</h2>
          <p className="text-slate-500 font-medium text-lg">Manage your educational content and monitor student performance from here.</p>
        </div>
        <Link 
          href="/teacher/courses/new" 
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={20} /> Add New Course
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
            <div className={`p-4 rounded-2xl text-white ${stat.color} shadow-lg shadow-current/20`}>
              {stat.icon}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Content Management Section */}
      <div className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm">
        <h3 className="text-xl font-black text-slate-800 mb-6">Recently Uploaded Courses</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b">
                <th className="pb-4 font-bold">Course Name</th>
                <th className="pb-4 font-bold">Students</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-slate-700">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 font-bold text-blue-600 italic">Descriptive Anatomy 101</td>
                <td className="py-4">450 Students</td>
                <td className="py-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    Published
                  </span>
                </td>
                <td className="py-4 text-blue-500 font-bold cursor-pointer hover:underline text-sm">
                  Edit Content
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
