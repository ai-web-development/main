import { useState } from 'react';
import './Ask.css';

// ─── 카테고리 정의 ───────────────────────────────────────────────
type Category = '감정의 별' | '이성의 별' | '상상의 별';

const CATEGORIES: { label: Category; icon: string; color: string }[] = [
  { label: '감정의 별', icon: '💫', color: 'cat-emotion' },
  { label: '이성의 별', icon: '🌙', color: 'cat-reason' },
  { label: '상상의 별', icon: '✨', color: 'cat-imagination' },
];

// 내가 선택한 별을 제외한 나머지 중 무작위 1개 반환
function pickRandomOther(selected: Category): Category {
  const others = CATEGORIES.map((c) => c.label).filter((l) => l !== selected);
  return others[Math.floor(Math.random() * others.length)];
}

// ─── 컴포넌트 ────────────────────────────────────────────────────
const Ask = () => {
  const [selected, setSelected] = useState<Category | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [launched, setLaunched] = useState(false);
  const [sentTo, setSentTo] = useState<{ main: Category; random: Category } | null>(null);

  const totalLength = title.length + text.length;
  const canLaunch = selected !== null && title.trim().length > 0 && text.trim().length > 0;

  const handleLaunch = () => {
    if (!canLaunch || !selected) return;

    const random = pickRandomOther(selected);
    setSentTo({ main: selected, random });
    setLaunched(true);

    // 3.5초 뒤 초기화
    setTimeout(() => {
      setLaunched(false);
      setSentTo(null);
      setSelected(null);
      setTitle('');
      setText('');
    }, 3500);
  };

  /* ── 발사 완료 화면 ── */
  if (launched && sentTo) {
    return (
      <div className="ask-launched">
        <div className="ask-rocket">🚀</div>
        <p className="ask-launched-title">질문이 우주로 쏘아 올려졌어요!</p>
        <div className="ask-launched-tags">
          <span className="ask-tag ask-tag--main">{sentTo.main}</span>
          <span className="ask-tag-plus">+</span>
          <span className="ask-tag ask-tag--random">{sentTo.random}</span>
        </div>
        <p className="ask-launched-sub">두 별의 존재들에게 당신의 질문이 전달됩니다 🌌</p>
      </div>
    );
  }

  /* ── 기본 폼 ── */
  return (
    <div className="ask-wrap">
      {/* 제목 + 내용 통합 입력 박스 */}
      <p className="ask-section-label">질문을 적어보세요</p>
      <div className="ask-field">
        <input
          className="ask-field-title"
          type="text"
          placeholder="질문 제목…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={60}
        />
        <div className="ask-field-divider" />
        <textarea
          className="ask-field-body"
          placeholder="우주 어딘가의 존재에게 물어보고 싶은 것을 자유롭게 적어주세요…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={300}
          rows={3}
        />
        <p className="ask-char-count">{totalLength} / 360</p>
      </div>

      {/* 카테고리 선택 */}
      <p className="ask-section-label">별을 선택하세요</p>
      <div className="ask-categories">
        {CATEGORIES.map(({ label, icon, color }) => (
          <button
            key={label}
            type="button"
            className={`ask-cat-btn ${color} ${selected === label ? 'is-selected' : ''}`}
            onClick={() => setSelected(label)}
          >
            <span className="ask-cat-icon">{icon}</span>
            <span className="ask-cat-label">{label}</span>
          </button>
        ))}
      </div>

      {/* 쏘아 올리기 버튼 */}
      <button
        className={`ask-launch-btn ${canLaunch ? 'is-ready' : ''}`}
        onClick={handleLaunch}
        disabled={!canLaunch}
      >
        <span className="ask-launch-icon">🚀</span>
        쏘아 올리기
      </button>

      {!canLaunch && (
        <p className="ask-hint">제목·내용을 적고 별을 선택하면 쏘아 올릴 수 있어요</p>
      )}
    </div>
  );
};

export default Ask;
