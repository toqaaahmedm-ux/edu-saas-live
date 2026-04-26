"use client";

import { BookOpen, User, PlayCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const courses = [
    {
      id: 1,
      title: "Descriptive Anatomy",
      instructor: "Dr. Ahmed Kamal",
      lessons: 24,
      rating: 4.8,
      level: "Beginner",
    },
    {
      id: 2,
      title: "Human Physiology",
      instructor: "Dr. Sarah Mahmoud",
      lessons: 18,
      rating: 4.9,
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Medical Biochemistry",
      instructor: "Dr. Mohamed Ali",
      lessons: 30,
      rating: 4.7,
      level: "Beginner",
    },
  ];

  if (!isClient) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700 text-left">
      {/* Page Header */}
      <div className="bg-white p-10 rounded-[3rem] border border-blue-50 shadow-sm">
        <h2 className="text-4xl font-black text-slate-800 mb-3">Medical Courses Library</h2>
        <p className="text-slate-500 font-medium text-xl">
          Explore the latest certified curriculum for Ain Shams University.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            {/* Course Thumbnail Placeholder */}
            <div className="h-48 bg-blue-600 flex items-center justify-center text-white relative">
              <BookOpen size={60} className="opacity-20" />
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {course.level}
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-blue-600 transition-colors leading-tight min-h-[64px]">
                {course.title}
              </h3>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                  <User size={18} />
                </div>
                <span className="text-slate-500 font-bold">{course.instructor}</span>
              </div>

              <div className="flex justify-between items-center border-t pt-6">
                <div className="flex items-center gap-2 text-blue-600 font-black">
                  <PlayCircle size={20} />
                  <span>{course.lessons} Lessons</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star size={18} fill="currentColor" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                Start Learning Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
