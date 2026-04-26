"use client";
import { BarChart3, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    { label: "Total Revenue", value: "$4,250", trend: "+12.5%", isUp: true, icon: <DollarSign className="text-emerald-600" /> },
    { label: "Active Students", value: "1,284", trend: "+18.2%", isUp: true, icon: <Users className="text-blue-600" /> },
    { label: "Course Completions", value: "85%", trend: "-2.4%", isUp: false, icon: <BarChart3 className="text-purple-600" /> },
  ];

// هنا كتب الكلاسات كامله داخل المصفوفه
  const chartData = [
    { label: "M01", height: "h-[40%]" },
    { label: "M02", height: "h-[70%]" },
    { label: "M03", height: "h-[45%]" },
    { label: "M04", height: "h-[90%]" },
    { label: "M05", height: "h-[65%]" },
    { label: "M06", height: "h-[80%]" },
  ];

  const topCourses = [
    { name: "Clinical Anatomy", width: "w-[90%]", sales: 450, color: "bg-blue-500" },
    { name: "Neuroscience 101", width: "w-[64%]", sales: 320, color: "bg-emerald-500" },
    { name: "Biochemistry", width: "w-[42%]", sales: 210, color: "bg-purple-500" }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 text-left">
      <div>
        <h2 className="text-3xl font-black text-slate-800">Performance Analytics</h2>
        <p className="text-slate-500 font-medium italic">Track your growth and student engagement over time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl">{stat.icon}</div>
              <span className={`flex items-center gap-1 text-sm font-black ${stat.isUp ? "text-emerald-500" : "text-red-500"}`}>
                {stat.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-black text-slate-800 text-xl">Monthly Enrollment</h4>
            <select aria-label="Select timeframe" className="bg-slate-50 border-none text-sm font-bold rounded-xl px-4 py-2 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="flex items-end justify-between h-48 gap-2 px-4">
            {chartData.map((bar, i) => (
              <div key={i} className="flex-1 group relative">
                {/* تم التأكد من أن الكلاس بارز تماماً للمتصفح */}
                <div className={`bg-blue-100 group-hover:bg-blue-600 rounded-t-xl transition-all duration-500 cursor-pointer ${bar.height}`}></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-xl">
          <h4 className="font-black text-xl mb-6">Top Performing Courses</h4>
          <div className="space-y-6">
            {topCourses.map((course) => (
              <div key={course.name} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>{course.name}</span>
                  <span className="text-slate-400">{course.sales} Students</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`${course.color} h-full ${course.width} transition-all duration-1000`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
