import React from 'react';
import styles from './Footer.module.css';

const FOOTER_LINKS = [
  { label: 'AI웹개발 PROJECT',        href: '#' },

];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>

      {/* 저작권 — 왼쪽 */}
      <p className={styles.copyright}>
        © {year} ANOTHER STAR. All rights reserved.
      </p>

      {/* 링크 목록 — 오른쪽 */}
      <nav className={styles.links}>
        {FOOTER_LINKS.map(({ label, href }) => (
          <a key={label} href={href} className={styles.link}>
            {label}
          </a>
        ))}
      </nav>

    </footer>
  );
};

export default Footer;
