import { create } from "zustand";
import { persist } from "zustand/middleware";

// تعريف شكل البيانات (Types)
interface QuizState {
  currentIndex: number;
  answers: Record<string, string>; // ID السؤال : الإجابة المختارة
  timeRemaining: number;
  isStarted: boolean;
  isFinished: boolean; // 🆕 حالة انتهاء الاختبار

  // الأفعال (Actions)
  startQuiz: (time: number) => void;
  setAnswer: (questionId: string, value: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  skipQuestion: () => void;
  tick: () => void;
  completeQuiz: () => void; // 🆕 إنهاء الاختبار
  calculateScore: (questions: any[]) => number; // 🆕 حساب النتيجة المئوية
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentIndex: 0,
      answers: {},
      timeRemaining: 3600,
      isStarted: false,
      isFinished: false,

      startQuiz: (time) =>
        set({
          isStarted: true,
          isFinished: false,
          timeRemaining: time,
          currentIndex: 0,
          answers: {},
        }),

      setAnswer: (id, val) =>
        set((state) => ({
          answers: { ...state.answers, [id]: val },
        })),

      nextQuestion: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),

      prevQuestion: () => set((state) => ({ currentIndex: state.currentIndex - 1 })),

      skipQuestion: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),

      tick: () =>
        set((state) => {
          if (state.timeRemaining <= 0) {
            return { timeRemaining: 0, isFinished: true, isStarted: false };
          }
          return { timeRemaining: state.timeRemaining - 1 };
        }),

      completeQuiz: () => set({ isFinished: true, isStarted: false }),

      // 🆕 دالة حساب النتيجة بناءً على الأسئلة المعطاة
      calculateScore: (questions) => {
        const { answers } = get();
        let correctCount = 0;
        
        questions.forEach((q) => {
          // بنقارن إجابة الطالب بالرقم الصحيح المخزن (مع تحويله لـ string)
          if (answers[q.id] === q.correct.toString()) {
            correctCount++;
          }
        });

        return Math.round((correctCount / questions.length) * 100);
      },

      resetQuiz: () =>
        set({
          currentIndex: 0,
          answers: {},
          isStarted: false,
          isFinished: false,
          timeRemaining: 3600,
        }),
    }),
    {
      name: "quiz-storage", // حفظ البيانات في LocalStorage
    }
  )
);
