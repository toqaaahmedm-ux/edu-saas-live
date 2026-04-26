"use client"; 

import { useQuizStore } from "@/Store/useQuizStore"; 
import { Certificate } from "@/components/student/Certificate"; 
import Link from "next/link"; 
import { Award, RefreshCcw, Home, Download } from "lucide-react"; 
import { useEffect, useState } from "react"; 

// مصفوفة الأسئلة (يجب أن تتطابق مع صفحة الكويز)
const mockQuestions = [ 
  { id: "q1", correct: 1 }, 
  { id: "q2", correct: 2 } 
]; 

export default function ResultPage() { 
  const { calculateScore, resetQuiz } = useQuizStore(); 
  const [score, setScore] = useState(0); 
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => { 
    setIsClient(true); 
    // حساب الدرجة الفعلية من الـ Store
    const finalScore = calculateScore(mockQuestions); 
    setScore(finalScore); 
  }, [calculateScore]); 

  if (!isClient) return null; 

  const isPassed = score >= 50; 

  return ( 
    <div className="w-full flex flex-col items-center py-10 px-4 text-left"> 
      <div className="max-w-5xl w-full bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-blue-50 text-center animate-in fade-in zoom-in duration-500"> 
        
        {/* أيقونة الحالة */} 
        <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 ${ 
          isPassed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600" 
        }`}> 
          <Award size={48} aria-hidden="true" /> 
        </div> 

        <h1 className="text-4xl font-black text-slate-800 mb-2"> 
          {isPassed ? "Congratulations! 🎉" : "Keep pushing! You'll get it next time"} 
        </h1> 
        
        <p className="text-gray-500 text-xl mb-8 font-medium"> 
          Your final score is <span className="text-blue-600 font-black text-4xl">{score}%</span> 
        </p> 

        {/* معاينة الشهادة وتحميلها - للناجحين فقط */} 
        {isPassed ? ( 
          <div className="mb-10 space-y-6"> 
            <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200"> 
              <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">Official Certificate Preview</h3> 
              
              {/* عرض الشهادة */} 
              <div className="flex justify-center overflow-hidden h-[300px] md:h-[450px]">
                <div className="scale-[0.45] md:scale-[0.65] lg:scale-[0.8] origin-top"> 
                  <Certificate name="Tuqa Mohamed" score={score} /> 
                </div> 
              </div>
            </div> 

            <button 
              aria-label="Download Certificate as PDF"
              onClick={() => window.print()} 
              className="flex items-center gap-2 mx-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95" 
            > 
              <Download size={20} /> Save Certificate as PDF 
            </button> 
          </div> 
        ) : ( 
          <div className="mb-10 p-6 bg-red-50 rounded-2xl border border-red-100"> 
            <p className="text-red-600 font-bold"> 
              You need at least 50% to earn a certificate. Don't give up, try again! 
            </p> 
          </div> 
        )} 

        {/* أزرار التنقل */} 
        <div className="flex flex-wrap justify-center gap-4 border-t border-slate-100 pt-10"> 
          <Link 
            href="/student/dashboard" 
            onClick={resetQuiz} 
            className="flex items-center gap-2 px-8 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all" 
          > 
            <Home size={20} /> Back to Home 
          </Link> 
          
          <Link 
            href="/student/quizzes" 
            onClick={resetQuiz} 
            className="flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all" 
          > 
            <RefreshCcw size={20} /> Retake Quiz 
          </Link> 
        </div> 
      </div> 
    </div> 
  ); 
}
