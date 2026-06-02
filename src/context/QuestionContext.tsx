import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Category = '감정의 별' | '이성의 별' | '상상의 별';

export type Question = {
  id: string;
  title: string;
  text: string;
  sentTo: Category[];
};

type QuestionContextType = {
  questions: Question[];
  addQuestion: (q: Omit<Question, 'id'>) => void;
  removeQuestion: (id: string) => void;
};

const QuestionContext = createContext<QuestionContextType | null>(null);

export const QuestionProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (q: Omit<Question, 'id'>) => {
    setQuestions((prev) => [
      { ...q, id: crypto.randomUUID() },
      ...prev,
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <QuestionContext.Provider value={{ questions, addQuestion, removeQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => {
  const ctx = useContext(QuestionContext);
  if (!ctx) throw new Error('useQuestions must be used within QuestionProvider');
  return ctx;
};
