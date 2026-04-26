"use client";

// Necessary for components in Next.js 14+

const Navbar = () => {
  return (
    /* Nav takes full width and justifies content between brand and user info */
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white border-b border-slate-50">
      
      {/* Left side: Platform Name / Brand */}
      <div className="text-2xl font-black text-blue-600 tracking-tight">
        EduSaaS
      </div>

      {/* Right side: User Profile Data */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-gray-800">Tuqa Mohamed</span>
          <span className="text-xs text-green-500 font-medium">Online • Student</span>
        </div>

        {/* User Avatar */}
        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl shadow-sm border border-blue-50">
          👤
        </div>
      </div>
    </nav>
  );
};

// ✅ This export line is crucial to prevent Runtime Errors
export default Navbar;
