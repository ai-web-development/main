import { useState } from 'react';
import { useAnswers } from '../../../context/AnswerContext';
import type { Category } from '../../../context/QuestionContext';
import './QuestionList.css';

type Props = {
  questionId: string;
  isInitial?: boolean;
  currentCategory: Category;
};

const AnswerSection = ({ questionId, isInitial, currentCategory }: Props) => {
  const { getAnswers, addAnswer, removeAnswer } = useAnswers();
  const [draft, setDraft] = useState('');

  const answers = getAnswers(questionId).filter((a) => a.category === currentCategory);
  const canReply = draft.trim().length > 0;

  const handleSubmit = () => {
    if (!isInitial) return;
    const text = draft.trim();
    if (!text) return;
    addAnswer(questionId, text, currentCategory);
    setDraft('');
  };

  return (
    <>
      {answers.length > 0 && (
        <div className="ql-answer-list">
          {answers.map((answer) => (
            <div key={answer.id} className="ql-answer-item">
              <p className="ql-answer-text">{answer.text}</p>
              <button
                type="button"
                className="ql-answer-delete"
                onClick={() => removeAnswer(questionId, answer.id)}
                aria-label="답변 삭제"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {isInitial ? (
        <div className="ql-answer-section">
          <textarea
            className="ql-answer-textarea"
            placeholder="이 질문에 답변을 작성해보세요…"
            value={draft}
            rows={3}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={240}
          />
          <button
            className={`ql-answer-btn ${canReply ? 'is-ready' : ''}`}
            type="button"
            onClick={handleSubmit}
            disabled={!canReply}
          >
            답변 등록
          </button>
        </div>
      ) : (
        <p className="ql-no-answer">직접 작성한 질문에는 답변을 달 수 없습니다.</p>
      )}
    </>
  );
};

export default AnswerSection;
