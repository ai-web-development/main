import styles from './EmotionStar.module.css';
import { useQuestions } from '../../context/QuestionContext';
import QuestionList from '../../components/askAndAnswer/answer/QuestionList';
import categories from '../../data/categories.json';

const EmotionStar = () => {
  const { questions } = useQuestions();
  const filtered = questions.filter((q) => q.sentTo.includes(categories.emotion));

  return (
    <div className={styles.page}>
      <span className={styles.badge}>❤️</span>
      <h1 className={styles.title}>{categories.emotion}</h1>
      <hr className={styles.divider} />
      <p className={styles.desc}>감정을 나누는 공간입니다.</p>
      <QuestionList questions={filtered} accentColor="#e87070" currentCategory={categories.emotion} />
    </div>
  );
};

export default EmotionStar;
