"use client";

import { Play, FileText, CheckCircle2, ChevronLeft, MessageSquare, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function LessonPlayerPage() {
  const [isClient, setIsClient] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState(1);

  useEffect(() => setIsClient(true), []);

  // إضافة روابط فيديو حقيقية لكل درس (YouTube Embed)
  const lessons = [
    { id: 1, title: "مقدمة في علم التشريح", duration: "15:00", type: "video", isCompleted: true, videoId: "uBGl2BujkPQ" },
    { id: 2, title: "المصطلحات الطبية الأساسية", duration: "22:30", type: "video", isCompleted: false, videoId: "r_w6Z-q_v3M" },
    { id: 3, title: "الجهاز الهيكلي - الجزء الأول", duration: "10:15", type: "video", isCompleted: false, videoId: "lUPV-Z7_98Y" },
  ];

  // تحديد الدرس الحالي بناءً على الـ ID المختار
  const currentLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];

  if (!isClient) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-700" dir="rtl">
      
      {/* 1. مشغل الفيديو والمحتوى العلمي */}
      <div className="flex-1 space-y-6">
        {/* مشغل الفيديو الذكي */}
        <div className="aspect-video bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white relative group transition-all">
          <iframe
            className="w-full h-full"
            src={`https://youtube.com{currentLesson.videoId}?rel=0&modestbranding=1`}
            title={currentLesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* تفاصيل الدرس الحالي */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">جاري المشاهدة</span>
                <span className="text-slate-400 text-xs font-bold">الدرس {currentLesson.id}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">{currentLesson.title}</h2>
              <p className="text-slate-500 font-medium mt-1">كورس التشريح الوصفي (Anatomy) • جامعة عين شمس</p>
            </div>
            
            <button className="flex items-center gap-2 bg-green-50 text-green-600 px-6 py-3 rounded-2xl font-black hover:bg-green-100 transition-all shadow-sm">
              <CheckCircle2 size={20} /> إكمال الدرس
            </button>
          </div>
          
          <div className="flex gap-4 border-t border-slate-50 pt-6">
            <button className="flex items-center gap-2 text-slate-500 font-bold px-4 py-2 hover:bg-slate-50 rounded-xl transition-all">
              <FileText size={20} /> الملفات المرفقة
            </button>
            <button className="flex items-center gap-2 text-slate-500 font-bold px-4 py-2 hover:bg-slate-50 rounded-xl transition-all">
              <MessageSquare size={20} /> المناقشات
            </button>
          </div>
        </div>
      </div>

      {/* 2. قائمة محتويات الكورس */}
      <div className="w-full lg:w-[400px] space-y-4">
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-24">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center justify-between">
             محتوى الكورس 
             <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-bold">3 دروس</span>
          </h3>
          
          <div className="space-y-3">
            {lessons.map((lesson) => {
              const isActive = activeLessonId === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-[1.5rem] border-2 transition-all group ${
                    isActive 
                    ? "border-blue-600 bg-blue-50/50 shadow-md translate-x-[-4px]" 
                    : "border-transparent bg-slate-50 hover:bg-white hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? "bg-blue-600 text-white" : lesson.isCompleted ? "bg-green-100 text-green-600" : "bg-white text-slate-300"
                    }`}>
                      {isActive ? <PlayCircle size={20} /> : <Play size={18} />}
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-black ${isActive ? "text-blue-900" : "text-slate-700"}`}>
                        {lesson.title}
                      </p>
                      <span className="text-[10px] text-slate-400 font-bold">{lesson.duration}</span>
                    </div>
                  </div>
                  {lesson.isCompleted && !isActive && <CheckCircle2 size={18} className="text-green-500" />}
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50">
             <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                <ChevronLeft size={20} /> العودة للمكتبة
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
