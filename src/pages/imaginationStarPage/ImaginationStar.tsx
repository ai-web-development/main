import styles from './ImaginationStar.module.css';
import { useQuestions } from '../../context/QuestionContext';
import QuestionList from '../../components/askAndAnswer/answer/QuestionList';

const ImaginationStar = () => {
  const { questions } = useQuestions();
  const filtered = questions.filter((q) => q.sentTo.includes('상상의 별'));

  return (
    <div className={styles.page}>
      <span className={styles.badge}>✨</span>
      <h1 className={styles.title}>상상의 별</h1>
      <hr className={styles.divider} />
      <p className={styles.desc}>상상력을 펼치는 공간입니다.</p>
      <QuestionList questions={filtered} accentColor="#9b71c8" currentCategory="상상의 별" />
    </div>
  );
};

export default ImaginationStar;
