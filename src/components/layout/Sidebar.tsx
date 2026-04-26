"use client";

// Very important as we are using usePathname
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { label: 'Dashboard', href: '/student/dashboard', icon: '🏠' },
  { label: 'My Courses', href: '/student/courses', icon: '📚' },
  { label: 'Quizzes', href: '/student/quizzes', icon: '📝' },
  { label: 'Certificates', href: '/student/certificates', icon: '🎓' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    // Fixed layout for English: border-r (right border) as it sits on the left
    <aside className="w-64 bg-white border-r h-screen sticky top-0 p-4 hidden md:block text-left">
      <div className="text-2xl font-black mb-10 text-blue-600 px-2 tracking-tight">
        EduSaaS
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center p-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                  : "text-gray-600 hover:bg-blue-50"
              }`}
            >
              {/* Icon spacing adjusted for LTR (mr-3 instead of ml-3) */}
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
