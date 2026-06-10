import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Category } from './QuestionContext';

export type Answer = {
  id: string;
  questionId: string;
  text: string;
  createdAt: string;
  category: Category;
};

type AnswerContextType = {
  getAnswers: (questionId: string) => Answer[];
  addAnswer: (questionId: string, answerText: string, category: Category) => void;
  removeAnswer: (questionId: string, answerId: string) => void;
};

const AnswerContext = createContext<AnswerContextType | null>(null);

const STORAGE_KEY = 'another-star-answers';

function loadInitial(): Answer[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as Answer[];

    // Migration: extract answers embedded in questions storage
    const qSaved = localStorage.getItem('another-star-questions');
    if (qSaved) {
      const parsed = JSON.parse(qSaved) as any[];
      const extracted: Answer[] = [];
      parsed.forEach((q) => {
        (q.answers ?? []).forEach((a: any) => extracted.push({ ...a, questionId: q.id }));
      });
      return extracted;
    }

    return [];
  } catch {
    return [];
  }
}

export const AnswerProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<Answer[]>(loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const getAnswers = (questionId: string) => answers.filter((a) => a.questionId === questionId);

  const addAnswer = (questionId: string, answerText: string, category: Category) => {
    setAnswers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), questionId, text: answerText, createdAt: new Date().toISOString(), category },
    ]);
  };

  const removeAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => prev.filter((a) => !(a.questionId === questionId && a.id === answerId)));
  };

  return <AnswerContext.Provider value={{ getAnswers, addAnswer, removeAnswer }}>{children}</AnswerContext.Provider>;
};

export const useAnswers = () => {
  const ctx = useContext(AnswerContext);
  if (!ctx) throw new Error('useAnswers must be used within AnswerProvider');
  return ctx;
};
