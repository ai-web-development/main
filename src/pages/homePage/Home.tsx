import { useEffect } from 'react';
import styles from './Home.module.css';
import Ask from '../../components/askAndAnswer/ask/Ask';
import logo from '../../assets/logo.png';

const Home = () => {
  useEffect(() => {
    document.title = 'another-star';
  }, []);

  return (
    <div className={styles.page}>
      <img src={logo} alt="ANOTHER STAR" className={styles.badge} />
      <h1 className={styles.title}>당신의 궁금한 것을 질문하세요.</h1>
      <p className={styles.desc}>당신이 선택한 별과 존재하지도 못하는 별에 당신의 질문이 공유됩니다.</p>
      <hr className={styles.divider} />
      <Ask />
    </div>
  );
};

export default Home;
