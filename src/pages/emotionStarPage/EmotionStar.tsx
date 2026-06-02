import styles from './EmotionStar.module.css';
import { useQuestions } from '../../context/QuestionContext';
import QuestionList from '../../components/askAndAnswer/answer/QuestionList';

const EmotionStar = () => {
  const { questions } = useQuestions();
  const filtered = questions.filter((q) => q.sentTo.includes('감정의 별'));

  return (
    <div className={styles.page}>
      <span className={styles.badge}>❤️</span>
      <h1 className={styles.title}>감정의 별</h1>
      <hr className={styles.divider} />
      <p className={styles.desc}>감정을 나누는 공간입니다.</p>
      <QuestionList questions={filtered} accentColor="#e87070" currentCategory="감정의 별" />
    </div>
  );
};

export default EmotionStar;
