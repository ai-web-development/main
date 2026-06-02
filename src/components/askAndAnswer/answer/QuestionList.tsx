import type { Category, Question } from '../../../context/QuestionContext';
import { useQuestions } from '../../../context/QuestionContext';
import './QuestionList.css';

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

        return (
          <li key={q.id} className="ql-item" style={{ borderLeftColor: accentColor }}>
            <div className="ql-header">
              <div className="ql-header-left">
                {isRandom && (
                  <span className="ql-random-badge">✦ {fromStar}에서 랜덤 전달</span>
                )}
              </div>
              <button
                className="ql-delete-btn"
                onClick={() => removeQuestion(q.id)}
                aria-label="질문 삭제"
              >
                ✕
              </button>
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
