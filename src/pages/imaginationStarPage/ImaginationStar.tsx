import { useEffect } from 'react';
import styles from './ImaginationStar.module.css';
import { useQuestions } from '../../context/QuestionContext';
import QuestionList from '../../components/askAndAnswer/answer/QuestionList';
import categories from '../../data/categories.json';

const ImaginationStar = () => {
  useEffect(() => {
    document.title = 'another-star-imagination';
  }, []);

  const { questions } = useQuestions();
  const filtered = questions.filter((q) => q.sentTo.includes(categories.imagination));

  return (
    <div className={styles.page}>
      <span className={styles.badge}>✨</span>
      <h1 className={styles.title}>{categories.imagination}</h1>
      <hr className={styles.divider} />
      <p className={styles.desc}>상상력을 펼치는 공간입니다.</p>
      <QuestionList questions={filtered} accentColor="#9b71c8" currentCategory={categories.imagination} />
    </div>
  );
};

export default ImaginationStar;
