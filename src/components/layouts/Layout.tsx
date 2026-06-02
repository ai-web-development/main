import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.pageBox}>

        {/* 상단 고정 */}
        <Header />

        {/* Body — flex:1 + overflow-y:auto 로 이 영역만 스크롤 */}
        <main className={styles.body}>
          <Outlet />
        </main>

        {/* 하단 고정 */}
        <Footer />

      </div>
    </div>
  );
};

export default Layout;
