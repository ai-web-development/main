// 전체적인 뼈대를 작성하는 컴포넌트

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

/*
<Outlet /> 
: React Router 라이브러리에서 제공하는 매우 중요한 컴포넌트
-> 자식 페이지가 들어올 자리(빈슬롯)
ex) /emotion 주소로 들어오면, 다른 것은 그대로고 <Outlet /> 자리에 EmotionStar 컴포넌트가 탑재됨
 */

/*
+---------------------------------------------------+
|  styles.outer (화면 전체를 감싸는 가장 바깥 영역)    |
|  +---------------------------------------------+  |
|  |  styles.pageBox (앱의 메인 박스)              |  |
|  |  +---------------------------------------+  |  |
|  |  |  <Header /> (상단 내비게이션 고정)       |  |  |
|  |  +---------------------------------------+  |  |
|  |  |  <main className={styles.body}>       |  |  |
|  |  |                                       |  |  |
|  |  |  ◀ 주소에 따라 <Outlet /> 자리에      |  |  |
|  |  |    Home / EmotionStar 등이 갈아끼워짐 |  |  |
|  |  |                                       |  |  |
|  |  | </main> (★이 영역만 위아래로 스크롤!)   |  |  |
|  |  +---------------------------------------+  |  |
|  |  |  <Footer /> (하단 바 고정)               |  |  |
|  |  +---------------------------------------+  |  |
|  |  +------------------------------------------+  |
+---------------------------------------------------+*/