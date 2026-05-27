import styles from './ReasonStar.module.css';

const ReasonStar = () => (
  <div className={styles.page}>
    <span className={styles.badge}>🔵</span>
    <h1 className={styles.title}>이성의 별</h1>
    <hr className={styles.divider} />
    <p className={styles.desc}>논리와 이성을 나누는 공간입니다.</p>
  </div>
);

export default ReasonStar;
