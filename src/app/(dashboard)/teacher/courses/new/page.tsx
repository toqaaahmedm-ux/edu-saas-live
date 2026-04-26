"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "@/components/shared/FormInput";
import { ImagePlus, Save, LayoutGrid } from "lucide-react";

// 1. Validation Schema (Translated to English)
const courseSchema = z.object({
  title: z.string().min(5, "Course title is too short"),
  description: z.string().min(20, "Please provide a detailed description (min 20 characters)"),
  price: z.string().min(1, "Please specify the course price"),
  category: z.string().min(1, "Please select a category"),
});

type CourseInput = z.infer<typeof courseSchema>;

export default function NewCoursePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseInput>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = (data: CourseInput) => {
    console.log("New Course Data:", data);
    // Future Database integration
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 text-left">
      {/* Header */}
      <div className="flex items-center gap-4 border-b pb-6">
        <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg">
          <LayoutGrid size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800">Create Professional Course</h2>
          <p className="text-slate-500 font-medium italic">
            Fill in the details below to publish your scientific material for Ain Shams University students.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Right Section: Basic Information (Now on the left in LTR) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-blue-600 mb-4 border-l-4 border-blue-600 pl-3">
            Basic Information
          </h3>
          
          <FormInput
            label="Course Title"
            register={register("title")}
            error={errors.title?.message}
            placeholder="e.g., Advanced Descriptive Anatomy"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Course Description</label>
            <textarea
              {...register("description")}
              className={`p-4 border rounded-2xl min-h-[150px] outline-none transition-all ${
                errors.description 
                  ? "border-red-500" 
                  : "border-gray-200 focus:border-blue-500 bg-gray-50/50"
              }`}
              placeholder="Briefly describe what students will learn..."
            />
            {errors.description && (
              <span className="text-xs text-red-500 font-medium">{errors.description.message}</span>
            )}
          </div>
        </div>

        {/* Left Section: Pricing and Media (Now on the right in LTR) */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-blue-600 mb-4 border-l-4 border-blue-600 pl-3">
              Pricing & Category
            </h3>
            
            <FormInput
              label="Course Price (EGP)"
              type="number"
              register={register("price")}
              error={errors.price?.message}
              placeholder="0.00"
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Course Specialty</label>
              <select
                {...register("category")}
                className="p-3 border rounded-xl border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-gray-600"
              >
                <option value="">Select Specialty...</option>
                <option value="anatomy">Anatomy</option>
                <option value="physiology">Physiology</option>
                <option value="biochemistry">Biochemistry</option>
              </select>
              {errors.category && (
                <span className="text-xs text-red-500 font-medium">{errors.category.message}</span>
              )}
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border-2 border-dashed border-blue-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-blue-100/50 transition-all group">
            <ImagePlus className="text-blue-400 group-hover:scale-110 transition-transform" size={40} />
            <p className="text-blue-600 font-bold text-sm">Upload Course Cover</p>
            <p className="text-[10px] text-slate-400 font-medium italic text-center">
              High-quality 1280x720 image recommended
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 flex justify-end gap-4 border-t pt-8">
          <button
            type="button"
            className="px-10 py-4 text-slate-500 font-bold hover:bg-slate-100 rounded-2xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-14 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Save size={20} />
            Publish Course Now
          </button>
        </div>
      </form>
    </div>
  );
}
