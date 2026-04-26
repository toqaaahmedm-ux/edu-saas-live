"use client"; 

import { useQuizStore } from "@/Store/useQuizStore"; 
import { QuizTimer } from "@/components/student/QuizTimer"; 
import { useEffect, useState } from "react"; 
import { useRouter } from "next/navigation"; 

// Translated Questions for English Version 
const mockQuestions = [ 
  { id: "q1", question: "What is the longest bone in the human body?", options: ["Skull", "Femur", "Spine", "Humerus"], correct: 1 }, 
  { id: "q2", question: "How many valves does the human heart have?", options: ["2", "3", "4", "5"], correct: 2 } 
]; 

export default function QuizPage() { 
  const [isClient, setIsClient] = useState(false); 
  const quiz = useQuizStore(); 
  const router = useRouter(); 

  useEffect(() => { 
    setIsClient(true); 
    if (!quiz.isStarted && !quiz.isFinished) quiz.startQuiz(30 * 60); 
  }, [quiz]); 

  if (!isClient) return null; 

  const currentQ = mockQuestions[quiz.currentIndex]; 

  // Completion Screen (After last question) 
  if (!currentQ || quiz.isFinished) { 
    return ( 
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4 animate-in fade-in zoom-in duration-500"> 
        <div className="text-center bg-white p-12 md:p-20 rounded-[3.5rem] shadow-2xl border border-blue-50 max-w-3xl w-full"> 
          <div className="mb-8 flex justify-center"> 
            <span className="text-7xl md:text-8xl animate-bounce">🥳</span> 
          </div> 
          <h2 className="text-4xl md:text-6xl font-black text-blue-600 mb-6 tracking-tight"> Quiz Completed! 🎉 </h2> 
          <p className="text-gray-500 text-xl md:text-2xl font-bold mb-10 leading-relaxed"> 
            You have successfully finished the test. <br /> 
            <span className="text-blue-400 font-medium text-lg italic">Calculating your final results...</span> 
          </p> 
          <div className="flex justify-center gap-2 mb-10"> 
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div> 
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div> 
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.5s]"></div> 
          </div> 
          <button 
            aria-label="View Result and Certificate"
            onClick={() => { quiz.completeQuiz(); router.push("/student/quizzes/result"); }} 
            className="px-14 py-4 bg-blue-600 text-white text-xl font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-95" 
          > 
            View Result & Certificate 📜 
          </button> 
        </div> 
      </div> 
    ); 
  } 

  return ( 
    <div className="w-full min-h-full flex flex-col items-center p-4 md:p-8 text-left"> 
      <div className="w-full max-w-6xl flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500"> 
        {/* Header Section */} 
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-row justify-between items-center w-full"> 
          <div> 
            <p className="text-blue-600 font-bold text-xs md:text-sm mb-1 uppercase tracking-widest">Ain Shams University - Faculty of Medicine</p> 
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tighter"> 
              Question {quiz.currentIndex + 1} <span className="text-gray-200 font-light">/</span> {mockQuestions.length} 
            </h2> 
          </div> 
          <div className="flex-shrink-0"> 
            <QuizTimer /> 
          </div> 
        </div> 

        {/* Question Card */} 
        <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-gray-100 w-full min-h-[550px] flex flex-col transition-all"> 
          <h3 className="text-3xl md:text-5xl font-black text-slate-800 mb-14 leading-tight"> 
            {currentQ.question} 
          </h3> 

          <div className="flex flex-col gap-5 w-full flex-1"> 
            {currentQ.options.map((opt, i) => { 
              const isSelected = quiz.answers[currentQ.id] === i.toString(); 
              return ( 
                <button 
                  key={i} 
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => quiz.setAnswer(currentQ.id, i.toString())} 
                  className={`flex items-center justify-between p-6 md:p-8 rounded-[2rem] border-2 transition-all duration-300 group ${ 
                    isSelected ? "border-blue-600 bg-blue-50/50 shadow-md scale-[1.01]" : "border-gray-100 bg-white hover:border-blue-200" 
                  }`} 
                > 
                  <div className="flex items-center gap-6"> 
                    <span className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-black text-xl md:text-3xl border-2 ${ 
                      isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-400 border-gray-100 group-hover:bg-white" 
                    }`}> 
                      {String.fromCharCode(65 + i)} 
                    </span> 
                    <span className={`text-xl md:text-3xl font-bold transition-colors ${isSelected ? "text-blue-900" : "text-slate-600"}`}> 
                      {opt} 
                    </span> 
                  </div> 
                  {isSelected && ( 
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm"> 
                      <span className="text-lg font-bold">✓</span> 
                    </div> 
                  )} 
                </button> 
              ); 
            })} 
          </div> 

          {/* Navigation Controls */} 
          <div className="mt-16 pt-10 border-t border-gray-100 flex items-center justify-between w-full"> 
            <button 
              aria-label="Previous question"
              disabled={quiz.currentIndex === 0} 
              onClick={quiz.prevQuestion} 
              className="px-10 py-4 rounded-xl font-bold text-gray-400 hover:text-slate-800 disabled:opacity-20 transition-all text-xl" 
            > 
              Previous 
            </button> 
            <div className="flex gap-4"> 
              <button 
                aria-label="Skip question"
                onClick={quiz.skipQuestion} 
                className="px-8 py-4 rounded-xl border-2 border-orange-100 text-orange-600 font-bold hover:bg-orange-50 transition-all text-xl" 
              > 
                Skip ⏩ 
              </button> 
              <button 
                aria-label={quiz.currentIndex === mockQuestions.length - 1 ? "Finish Quiz" : "Next question"}
                onClick={quiz.nextQuestion} 
                className="px-14 py-4 rounded-2xl bg-blue-600 text-white font-black shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all text-xl" 
              > 
                {quiz.currentIndex === mockQuestions.length - 1 ? "Finish Quiz" : "Next ➡️"} 
              </button> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}
