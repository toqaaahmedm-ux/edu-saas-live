"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "@/components/shared/FormInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };

      const userRole = getCookie("user-role") || "STUDENT";

      // التوجيه بناءً على هيكل مجلداتك الحالي
      if (userRole === "TEACHER") {
        router.push("/teacher/courses"); // المجلد teacher يحتوي على courses
      } else {
        router.push("/student/dashboard"); // المجلد student يحتوي على dashboard
      }
    } catch (error) {
      alert("حدث خطأ، تأكد من البيانات.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        <div className="text-center space-y-2 mb-6">
          <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
            <LockKeyhole className="text-blue-600" size={24} />
          </div>
          <h2 className="text-3xl font-black text-gray-800">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Please enter your details to login</p>
        </div>

        <FormInput label="Email Address" type="email" register={register("email")} error={errors.email?.message} placeholder="example@mail.com" />
        <FormInput label="Password" type="password" register={register("password")} error={errors.password?.message} placeholder="******" />

        <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white hover:bg-blue-700 active:scale-95 transition-all shadow-lg disabled:opacity-70">
          {isLoading ? <><Loader2 className="animate-spin" size={20} /> <span>Logging in...</span></> : "Login to Account"}
        </button>

        <p className="text-center text-sm text-gray-600 pt-4 border-t">
          Don't have an account? <Link href="/register" className="text-blue-600 font-bold hover:underline">Create one here</Link>
        </p>
      </form>
    </div>
  );
}
