import { useState } from 'react';
import type { Answer, Category, Question } from '../../../context/QuestionContext';
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
  const { removeQuestion, addAnswer, removeAnswer } = useQuestions();
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const handleDraftChange = (questionId: string, value: string) => {
    setDrafts((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitAnswer = (questionId: string, isInitial?: boolean) => {
    if (!isInitial) return; // prevent answering non-initial (user-created) questions
    const answerText = drafts[questionId]?.trim();
    if (!answerText) return;

    addAnswer(questionId, answerText, currentCategory);
    setDrafts((prev) => ({ ...prev, [questionId]: '' }));
  };

  if (questions.length === 0) {
    return <p className="ql-empty">아직 도착한 질문이 없어요 🌌</p>;
  }

  return (
    <ul className="ql-list">
      {questions.map((q) => {
        const isRandom = q.sentTo[0] !== currentCategory;
        const fromStar = isRandom ? q.sentTo[0] : null;
        const alsoSentTo = !isRandom ? q.sentTo[1] : null;
        const draft = drafts[q.id] ?? '';
        const canReply = draft.trim().length > 0;

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

            {q.answers.filter((answer) => answer.category === currentCategory).length > 0 && (
              <div className="ql-answer-list">
                {q.answers
                  .filter((answer) => answer.category === currentCategory)
                  .map((answer: Answer) => (
                    <div key={answer.id} className="ql-answer-item">
                      <p className="ql-answer-text">{answer.text}</p>
                      <button
                        type="button"
                        className="ql-answer-delete"
                        onClick={() => removeAnswer(q.id, answer.id)}
                        aria-label="답변 삭제"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
            )}

            {q.isInitial ? (
              <div className="ql-answer-section">
                <textarea
                  className="ql-answer-textarea"
                  placeholder="이 질문에 답변을 작성해보세요…"
                  value={draft}
                  rows={3}
                  onChange={(e) => handleDraftChange(q.id, e.target.value)}
                  maxLength={240}
                />
                <button
                  className={`ql-answer-btn ${canReply ? 'is-ready' : ''}`}
                  type="button"
                  onClick={() => handleSubmitAnswer(q.id, q.isInitial)}
                  disabled={!canReply}
                >
                  답변 등록
                </button>
              </div>
            ) : (
              <p className="ql-no-answer">직접 작성한 질문에는 답변을 달 수 없습니다.</p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default QuestionList;
