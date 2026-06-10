import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/logo.png';
import categories from '../data/categories.json';

const NAV_LINKS = [
  { label: categories.home,         to: '/stars' },
  { label: categories.emotion,      to: '/emotion' },
  { label: categories.reason,       to: '/reason' },
  { label: categories.imagination,  to: '/imagination' },
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
