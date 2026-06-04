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

const initialQuestions: Question[] = [
  {
    id: '1',
    title: '좋아하는 애가 내 스토리 3초 만에 봤는데 이거 뭔가요ㄹㅇ',
    text: '스토리 올리자마자 3초도 안 돼서 봤던데요 ㅠㅠ 이거 그냥 알고리즘 때문에 뜬 거라 그런 건가요 아니면 진짜 신경 쓰고 있다는 건가요? 너무 헷갈려서 미치겠음ㅋㅋ',
    sentTo: ['감정의 별', '이성의 별'],
  },
  {
    id: '2',
    title: '수행평가 내가 다 했는데 이름만 올라가면 된 거임?ㅠ',
    text: '조별 수행평가인데 솔직히 내가 거의 다 한 것 같은데... 발표할 때 그냥 이름만 올라가면 그걸로 된 건가요? 이런 거 따지는 내가 소심한 건지 아니면 당연히 억울한 건지 모르겠어요ㅠ',
    sentTo: ['감정의 별', '이성의 별'],
  },
  {
    id: '3',
    title: '남자친구가 15,455원 달라는데 저만 이상한 건가요ㅠ',
    text: '데이트하고 정산하면서 남자친구가 15,455원 딱 맞게 달라고 하는데... 진짜 사랑하면 이런 거 안 따지지 않나요? 저만 이상하게 서운한 건지 ㅠㅠ 다들 이런 거 경험해봤어요?',
    sentTo: ['감정의 별'],
  },
];

export const QuestionProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

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
