"use client";

import { ShieldCheck, Users, CreditCard, LayoutGrid, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "EGP 124,500", icon: <CreditCard />, color: "bg-emerald-600" },
    { label: "New Users", value: "342", icon: <Users />, color: "bg-blue-600" },
    { label: "Pending Courses", value: "5", icon: <LayoutGrid />, color: "bg-amber-500" },
    { label: "System Reports", value: "0 Errors", icon: <ShieldCheck />, color: "bg-slate-700" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Admin Header */}
      <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2">Central Admin Panel 🔐</h2>
          <p className="text-slate-400 font-medium text-lg italic">
            Welcome back, Tuqa. You have 5 new courses waiting for review and publishing.
          </p>
        </div>
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Financial and Technical Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
            <div className={`p-4 rounded-2xl text-white ${stat.color} shadow-lg shadow-current/20`}>
              {stat.icon}
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Course Review Section (Core Admin Feature) */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-50 shadow-sm">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h3 className="text-xl font-black text-slate-800">Course Publishing Requests</h3>
          <span className="text-sm bg-amber-100 text-amber-600 px-4 py-1 rounded-full font-bold">5 Pending Requests</span>
        </div>

        <div className="space-y-4">
          {[1, 2].map((item) => (
            <div key={item} className="flex flex-col md:flex-row justify-between items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white transition-all group">
              <div className="flex items-center gap-4 text-left">
                <div className="w-16 h-12 bg-slate-200 rounded-xl"></div>
                <div>
                  <h4 className="font-black text-slate-800">Advanced Physiology</h4>
                  <p className="text-xs text-slate-400">By: <span className="text-blue-600 font-bold">Dr. Mohamed Hafez</span></p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="flex items-center gap-2 px-6 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-black hover:bg-emerald-600 hover:text-white transition-all">
                  <CheckCircle size={18} /> Approve
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-600 rounded-xl font-black hover:bg-red-600 hover:text-white transition-all">
                  <XCircle size={18} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
