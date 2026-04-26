"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validators/auth.schema";
import FormInput from "@/components/shared/FormInput";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "STUDENT", 
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      console.log("Sending data to API:", data);
      
      // 1. Future API call placeholder
      // const response = await fetch('/api/register', { ... });

      // 2. 🔐 Middleware integration:
      // Store the role in cookies so the Middleware can handle access
      document.cookie = `user-role=${data.role}; path=/; max-age=86400`; 

      // 3. 🚀 Automatic redirection based on role
      if (data.role === "TEACHER") {
        router.push("/teacher");
      } else {
        router.push("/student");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Oops! Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-xl border border-gray-100"
      >
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-3xl font-black text-blue-600">Create Account</h2>
          <p className="text-gray-400 text-sm">Join the largest educational platform at Ain Shams University</p>
        </div>

        <FormInput
          label="Full Name"
          register={register("name")}
          error={errors.name?.message}
          placeholder="Enter your full name"
        />

        <FormInput
          label="Email Address"
          type="email"
          register={register("email")}
          error={errors.email?.message}
          placeholder="example@mail.com"
        />

        {/* Role Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">Account Type</label>
          <select
            {...register("role")}
            className="p-3 border rounded-xl border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer text-gray-700 font-medium"
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>
          {errors.role && (
            <span className="text-xs text-red-500 font-medium">
              {errors.role.message}
            </span>
          )}
        </div>

        <FormInput
          label="Password"
          type="password"
          register={register("password")}
          error={errors.password?.message}
          placeholder="******"
        />

        <FormInput
          label="Confirm Password"
          type="password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          placeholder="******"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white hover:bg-blue-700 transform active:scale-95 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Loading...</span>
            </>
          ) : (
            "Create Account Now"
          )}
        </button>

        <p className="text-center text-sm text-gray-600 pt-4 border-t border-gray-50">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-bold hover:underline underline-offset-4"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
