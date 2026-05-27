import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/logo.png';

const NAV_LINKS = [
  { label: 'HOME',     to: '/' },
  { label: '감정의 별',  to: '/emotion' },
  { label: '이성의 별', to: '/reason' },
  { label: '상상의 별', to: '/imagination' },
];

const Header: React.FC = () => {
  return (
    <header className={styles.header}>

      {/* 로고 — 왼쪽, onClick이 없어도 페이지를 다시 받음 */} 
      <Link to="/" className={styles.logo}> 
        <img src={logo} alt="ANOTHER STAR" className={styles.logoIcon} />
        <span className={styles.logoText}>ANOTHER STAR COMMUNITY</span>
      </Link>

      {/* 네비게이션 — 오른쪽 */}
      <nav className={styles.nav}>
        {NAV_LINKS.map(({ label, to }) => (
          <Link key={label} to={to} className={styles.navLink}>
            {label}
          </Link>
        ))}
      </nav>

    </header>
  );
};

export default Header;
