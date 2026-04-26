import * as z from "zod";

/**
 * Quiz Schema
 * This schema handles validation for creating or submitting quizzes.
 */

// 1. Schema for a single question option
export const quizOptionSchema = z.string().min(1, "Option text cannot be empty");

// 2. Schema for a single quiz question
export const quizQuestionSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(10, "Question must be at least 10 characters long"),
  options: z.array(z.string()).length(4, "Each question must have exactly 4 options"),
  correctAnswer: z.number().min(0).max(3, "Please select the correct answer index"),
});

// 3. Schema for the entire quiz submission (from a teacher)
export const createQuizSchema = z.object({
  title: z.string().min(5, "Quiz title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a detailed description"),
  category: z.string().min(1, "Please select a category"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  questions: z.array(quizQuestionSchema).min(1, "At least one question is required"),
});

// 4. Schema for student answer submission
export const submitAnswerSchema = z.object({
  quizId: z.string(),
  answers: z.record(z.string(), z.string()), // { questionId: "selectedOptionIndex" }
});

/**
 * Type Extractions
 */
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type CreateQuizInput = z.infer<typeof createQuizSchema>;
export type SubmitAnswerInput = z.infer<typeof submitAnswerSchema>;
