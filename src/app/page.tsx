import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-left">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">EduSaaS Platform</h1>
      <p className="text-gray-600 mb-8 font-medium">Welcome to the Ain Shams University Educational Platform</p>
      
      <div className="flex gap-4">
        <Link 
          href="/login" 
          className="px-8 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
        >
          Login
        </Link>
        <Link 
          href="/register" 
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}

