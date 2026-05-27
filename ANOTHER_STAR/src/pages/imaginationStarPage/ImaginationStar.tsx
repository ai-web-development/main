import styles from './ImaginationStar.module.css';

const ImaginationStar = () => (
  <div className={styles.page}>
    <span className={styles.badge}>✨</span>
    <h1 className={styles.title}>상상의 별</h1>
    <hr className={styles.divider} />
    <p className={styles.desc}>상상력을 펼치는 공간입니다.</p>
  </div>
);

export default ImaginationStar;
