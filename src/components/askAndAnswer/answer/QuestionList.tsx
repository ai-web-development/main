import type { Category, Question } from '../../../context/QuestionContext';
import { useQuestions } from '../../../context/QuestionContext';
import './QuestionList.css';

const STAR_COLORS: Record<Category, string> = {
  '감정의 별': '#d92b3a',
  '이성의 별': '#5bafc5',
  '상상의 별': '#9b71c8',
};

type Props = {
  questions: Question[];
  accentColor: string;
  currentCategory: Category;
};

const QuestionList = ({ questions, accentColor, currentCategory }: Props) => {
  const { removeQuestion } = useQuestions();

  if (questions.length === 0) {
    return <p className="ql-empty">아직 도착한 질문이 없어요 🌌</p>;
  }

  return (
    <ul className="ql-list">
      {questions.map((q) => {
        const isRandom = q.sentTo[0] !== currentCategory;
        const fromStar = isRandom ? q.sentTo[0] : null;
        const alsoSentTo = !isRandom ? q.sentTo[1] : null;

        return (
          <li key={q.id} className="ql-item" style={{ borderLeftColor: accentColor }}>
            <div className="ql-header">
              <div className="ql-header-left">
                {isRandom && fromStar && (
                  <span className="ql-random-badge">✦ <span style={{ color: STAR_COLORS[fromStar] }}>{fromStar}</span>에서 날아온 질문</span>
                )}
                {!isRandom && alsoSentTo && (
                  <span className="ql-random-badge">✦ <span style={{ color: STAR_COLORS[alsoSentTo] }}>{alsoSentTo}</span>에도 닿았어요</span>
                )}
              </div>
              {!q.isInitial && (
                <button
                  className="ql-delete-btn"
                  onClick={() => removeQuestion(q.id)}
                  aria-label="질문 삭제"
                >
                  ✕
                </button>
              )}
            </div>
            <p className="ql-title">{q.title}</p>
            <p className="ql-text">{q.text}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default QuestionList;
