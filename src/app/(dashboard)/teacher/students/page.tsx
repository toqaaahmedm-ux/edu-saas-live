"use client";
import { Search, UserCheck, TrendingUp, Mail, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function StudentReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const students = [
    { id: 1, name: "Tuqa Mohamed", email: "taqaa@mail.com", progress: 95, lastQuiz: 98, status: "Active", progressWidth: "w-[95%]" },
    { id: 2, name: "Mohamed Hafez", email: "hafez@mail.com", progress: 45, lastQuiz: 60, status: "Absent", progressWidth: "w-[45%]" },
    { id: 3, name: "Sara Mahmoud", email: "sara@mail.com", progress: 80, lastQuiz: 85, status: "Active", progressWidth: "w-[80%]" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-left">
      {/* Page Header and Search */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Student Performance Tracking</h2>
          <p className="text-slate-500 font-medium italic text-lg">Monitor student progress and analyze periodic test results.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            aria-label="Search student name"
            placeholder="Search student name..." 
            className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold" 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      {/* Professional Data Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-sm uppercase tracking-widest">
                <th className="p-6 font-black text-left">Student</th>
                <th className="p-6 font-black text-left">Completion Rate</th>
                <th className="p-6 font-black text-left">Last Score</th>
                <th className="p-6 font-black text-left">Status</th>
                <th className="p-6 font-black text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-black shadow-sm">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-lg">{student.name}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                          <Mail size={12} /> {student.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden w-24">
                        {/* تم استبدال الـ inline style بكلاس Tailwind */}
                        <div className={`bg-blue-600 h-full transition-all ${student.progressWidth}`}></div>
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-green-600 font-black text-lg">
                      <TrendingUp size={18} /> {student.lastQuiz}%
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black shadow-sm ${
                      student.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-6">
                    {/* تم إضافة aria-label هنا */}
                    <button 
                      aria-label="View student details"
                      className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                    >
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
