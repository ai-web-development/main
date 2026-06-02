import styles from './ReasonStar.module.css';
import { useQuestions } from '../../context/QuestionContext';
import QuestionList from '../../components/askAndAnswer/answer/QuestionList';

const ReasonStar = () => {
  const { questions } = useQuestions();
  const filtered = questions.filter((q) => q.sentTo.includes('이성의 별'));

  return (
    <div className={styles.page}>
      <span className={styles.badge}>🔵</span>
      <h1 className={styles.title}>이성의 별</h1>
      <hr className={styles.divider} />
      <p className={styles.desc}>논리와 이성을 나누는 공간입니다.</p>
      <QuestionList questions={filtered} accentColor="#5bafc5" currentCategory="이성의 별" />
    </div>
  );
};

export default ReasonStar;
