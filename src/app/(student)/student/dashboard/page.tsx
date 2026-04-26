"use client"; 

import { useQuizStore } from "@/Store/useQuizStore"; 
import { BookOpen, Award, Clock, ChevronRight } from "lucide-react"; 
import Link from "next/link"; 
import { useEffect, useState } from "react"; 

export default function StudentDashboard() { 
  const { answers } = useQuizStore(); 
  const [isClient, setIsClient] = useState(false); 
  useEffect(() => setIsClient(true), []); 

  // مصفوفة الكورسات مع كلاسات العرض الجاهزة
  const myCourses = [ 
    { id: 1, title: "General Medical Anatomy", progress: 65, width: "w-[65%]", instructor: "Dr. Ahmed Ali" }, 
    { id: 2, title: "Human Physiology", progress: 20, width: "w-[20%]", instructor: "Dr. Sarah Mohamed" }, 
  ]; 

  if (!isClient) return null; 

  return ( 
    <div className="space-y-8 animate-in fade-in duration-700 text-left"> 
      {/* 1. Welcome Header */} 
      <div className="flex justify-between items-center bg-white p-8 rounded-[2rem] border border-blue-50 shadow-sm"> 
        <div> 
          <h2 className="text-3xl font-black text-slate-800 mb-2">Welcome back, Tuqa Mohamed 👋</h2> 
          <p className="text-slate-500 font-medium text-lg">You have a new quiz available in "Pathology".</p> 
        </div> 
        <div className="hidden md:flex w-24 h-24 bg-blue-100 rounded-full items-center justify-center text-4xl shadow-inner border-4 border-white text-slate-400"> 
          👤 
        </div> 
      </div> 

      {/* 2. Performance Statistics */} 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
        {[ 
          { label: "Enrolled Courses", value: "12", icon: <BookOpen />, color: "bg-blue-600" }, 
          { label: "Certificates Earned", value: Object.keys(answers).length > 0 ? "1" : "0", icon: <Award />, color: "bg-green-600" }, 
          { label: "Learning Hours", value: "48", icon: <Clock />, color: "bg-purple-600" }, 
        ].map((stat, i) => ( 
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-all"> 
            <div className={`p-4 rounded-2xl text-white ${stat.color} shadow-lg shadow-current/20`}> 
              {stat.icon} 
            </div> 
            <div> 
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">{stat.label}</p> 
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3> 
            </div> 
          </div> 
        ))} 
      </div> 

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> 
        {/* 3. Current Courses Tracking */} 
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm"> 
          <div className="flex justify-between items-center mb-6"> 
            <h3 className="text-xl font-black text-slate-800">My Current Courses</h3> 
            <Link aria-label="View all courses" href="/student/courses" className="text-blue-600 font-bold text-sm hover:underline">View All</Link> 
          </div> 
          <div className="space-y-5"> 
            {myCourses.map((course) => ( 
              <div key={course.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all group"> 
                <div className="flex justify-between mb-3"> 
                  <span className="font-bold text-slate-700">{course.title}</span> 
                  <span className="text-sm font-black text-blue-600">{course.progress}%</span> 
                </div> 
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden"> 
                  {/* استبدال الـ inline style بكلاس Tailwind */}
                  <div className={`bg-blue-600 h-full transition-all duration-1000 ${course.width}`}></div> 
                </div> 
              </div> 
            ))} 
          </div> 
        </div> 

        {/* 4. Recent Quiz Results */} 
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm"> 
          <h3 className="text-xl font-black text-slate-800 mb-6">Recent Quizzes</h3> 
          <div className="flex flex-col items-center justify-center min-h-[180px] border-2 border-dashed border-slate-100 rounded-3xl text-slate-400"> 
            {Object.keys(answers).length > 0 ? ( 
              <div className="w-full px-6 flex justify-between items-center text-slate-700 font-bold group cursor-pointer hover:bg-slate-50 p-4 rounded-2xl transition-all"> 
                <div className="flex items-center gap-3"> 
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> 
                  <span>General Anatomy Quiz</span> 
                </div> 
                <div className="flex items-center gap-3"> 
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-black">Passed</span> 
                  <ChevronRight aria-label="Go to quiz result" className="text-slate-300 group-hover:text-blue-600 transition-colors" /> 
                </div> 
              </div> 
            ) : ( 
              <div className="text-center space-y-2"> 
                <p className="font-bold">No quizzes completed yet</p> 
                <p className="text-xs italic">Start studying to see your results here</p> 
              </div> 
            )} 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}
