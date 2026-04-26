import { z } from "zod";

/**
 * Login Schema
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/**
 * Register Schema - النسخة المتوافقة مع Zod v4+
 */
export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password is too short"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    
    role: z.enum(["STUDENT", "TEACHER", "ADMIN"], {
      error: (issue) => 
        issue.input === undefined 
          ? "Please select an account type" 
          : "Invalid account type selected"
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
