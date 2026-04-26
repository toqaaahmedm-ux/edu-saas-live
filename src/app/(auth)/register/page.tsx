"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validators/auth.schema";
import FormInput from "@/components/shared/FormInput";
import Link from "next/link";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    console.log("Data submitted successfully:", data);
    // Future API integration will go here
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-lg border border-gray-100"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-blue-600">Create Account</h2>
          <p className="text-gray-500 text-sm">Join us and start your learning journey today</p>
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

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Account Type</label>
          <select
            {...register("role")}
            className="p-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>
          {errors.role && (
            <span className="text-xs text-red-500">{errors.role.message}</span>
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

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 transform active:scale-95 transition-all shadow-md"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 pt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
