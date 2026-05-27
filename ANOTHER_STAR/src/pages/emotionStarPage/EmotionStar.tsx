import styles from './EmotionStar.module.css';

const EmotionStar = () => (
  <div className={styles.page}>
    <span className={styles.badge}>❤️</span>
    <h1 className={styles.title}>감정의 별</h1>
    <hr className={styles.divider} />
    <p className={styles.desc}>감정을 나누는 공간입니다.</p>
  </div>
);

export default EmotionStar;
