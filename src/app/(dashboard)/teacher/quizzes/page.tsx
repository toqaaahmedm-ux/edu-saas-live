"use client";
import { useState } from "react";
import { Plus, Save, Trash2, HelpCircle, CheckCircle2 } from "lucide-react";

export default function QuizBuilderPage() {
  const [questions, setQuestions] = useState([
    { id: 1, question: "", options: ["", "", "", ""], correct: 0 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, question: "", options: ["", "", "", ""], correct: 0 }]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-orange-500 text-white rounded-2xl shadow-lg">
            <HelpCircle size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">Question Bank Builder</h2>
            <p className="text-slate-500 font-medium italic">Design your exams precisely to evaluate Ain Shams University students' performance.</p>
          </div>
        </div>
        <button 
          onClick={addQuestion} 
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all w-full md:w-auto justify-center"
        >
          <Plus size={20} /> Add Question
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-md relative group animate-in slide-in-from-left-4 duration-300">
            {/* Remove Button */}
            <button 
              aria-label="Remove question"
              onClick={() => removeQuestion(q.id)} 
              className="absolute top-6 right-6 text-red-300 hover:text-red-600 transition-colors"
            >
              <Trash2 size={20} />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-black">
                  {index + 1}
                </span>
                <input 
                  type="text" 
                  aria-label={`Question ${index + 1}`}
                  placeholder="Type your question here..." 
                  className="flex-1 bg-slate-50 border-none p-4 rounded-2xl text-xl font-bold outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                />
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((_, i) => (
                  <div key={i} className="relative group">
                    <input 
                      type="text" 
                      aria-label={`Option ${String.fromCharCode(65 + i)}`}
                      placeholder={`Option ${String.fromCharCode(65 + i)}`} 
                      className="w-full p-4 pl-12 rounded-xl border border-slate-100 bg-slate-50/50 outline-none focus:border-orange-500 transition-all text-sm font-bold" 
                    />
                    {/* Checkmark Button */}
                    <button 
                      aria-label="Mark as correct answer"
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${i === q.correct ? "bg-green-500 border-green-500 text-white" : "border-slate-200 text-transparent hover:border-green-400"}`}
                    >
                      <CheckCircle2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final Save Button */}
      <div className="flex justify-end gap-4 pt-10 border-t">
        <button className="flex items-center gap-2 bg-green-600 text-white px-16 py-4 rounded-2xl font-black shadow-xl shadow-green-100 hover:bg-green-700 transition-all active:scale-95">
          <Save size={20} /> Save Full Question Bank
        </button>
      </div>
    </div>
  );
}
