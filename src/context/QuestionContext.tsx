// QuestionContext에 질문과 답변 관련 로직을 모아두고, QuestionProvider로 감싸서 앱 전체에서 사용할 수 있게 함

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import categories from '../data/categories.json';

export type Category = typeof categories[keyof typeof categories];

export type Answer = {
  id: string;
  text: string;
  createdAt: string;
  category: Category;
};

export type Question = {
  id: string;
  title: string;
  text: string;
  sentTo: Category[];
  answers: Answer[];
  isInitial?: boolean;
};

type QuestionContextType = {
  questions: Question[];
  addQuestion: (q: Omit<Question, 'id' | 'answers'>) => void;
  addAnswer: (questionId: string, answerText: string, category: Category) => void;
  removeQuestion: (id: string) => void;
  removeAnswer: (questionId: string, answerId: string) => void;
};

const QuestionContext = createContext<QuestionContextType | null>(null);

const STORAGE_KEY = 'another-star-questions';

const initialQuestions: Question[] = [
  {
    id: '1',
    title: '좋아하는 애가 내 스토리 3초 만에 봤는데 이거 뭔가요ㄹㅇ',
    text: '스토리 올리자마자 3초도 안 돼서 봤던데요 ㅠㅠ 이거 그냥 알고리즘 때문에 뜬 거라 그런 건가요 아니면 진짜 신경 쓰고 있다는 건가요? 너무 헷갈려서 미치겠음ㅋㅋ',
    sentTo: [categories.emotion, categories.reason],
    answers: [],
    isInitial: true,
  },
  {
    id: '2',
    title: '수행평가 내가 다 했는데 이름만 올라가면 된 거임?ㅠ',
    text: '조별 수행평가인데 솔직히 내가 거의 다 한 것 같은데... 발표할 때 그냥 이름만 올라가면 그걸로 된 건가요? 이런 거 따지는 내가 소심한 건지 아니면 당연히 억울한 건지 모르겠어요ㅠ',
    sentTo: [categories.emotion, categories.reason],
    answers: [],
    isInitial: true,
  },
  {
    id: '3',
    title: '남자친구가 15,455원 달라는데 저만 이상한 건가요ㅠ',
    text: '데이트하고 정산하면서 남자친구가 15,455원 딱 맞게 달라고 하는데... 진짜 사랑하면 이런 거 안 따지지 않나요? 저만 이상하게 서운한 건지 ㅠㅠ 다들 이런 거 경험해봤어요?',
    sentTo: [categories.emotion],
    answers: [],
    isInitial: true,
  },
];

export const QuestionProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>(() => {
    if (typeof window === 'undefined') return initialQuestions;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return initialQuestions;
      const parsed = JSON.parse(saved) as Question[];
      return parsed.map((q) => ({ ...q, answers: q.answers ?? [] }));
    } catch {
      return initialQuestions;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (q: Omit<Question, 'id' | 'answers'>) => {
    setQuestions((prev) => [
      { ...q, id: crypto.randomUUID(), answers: [], isInitial: false },
      ...prev,
    ]);
  };

  const addAnswer = (questionId: string, answerText: string, category: Category) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: [
                ...q.answers,
                {
                  id: crypto.randomUUID(),
                  text: answerText,
                  createdAt: new Date().toISOString(),
                  category,
                },
              ],
            }
          : q,
      ),
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id || q.isInitial));
  };

  const removeAnswer = (questionId: string, answerId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.filter((answer) => answer.id !== answerId),
            }
          : q,
      ),
    );
  };

  return (
    <QuestionContext.Provider value={{ questions, addQuestion, addAnswer, removeQuestion, removeAnswer }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => {
  const ctx = useContext(QuestionContext);
  if (!ctx) throw new Error('useQuestions must be used within QuestionProvider');
  return ctx;
};
