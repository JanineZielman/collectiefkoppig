'use client'

import { useState } from 'react';
import { PrismicLink } from '@prismicio/react';
import styles from './Layout.module.scss';
import Link from 'next/link';

const Layout = ({ navigation, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Link href="/" className={styles.logo}>
        <img src="/SVG/koppig.svg"/>
      </Link>
      <div className={`${styles.menu} ${menuOpen ? styles.open : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <img src="/SVG/menu.svg" alt="Menu" />
      </div>
      <div className={`${styles.frame} ${menuOpen ? styles.open : ''}`}>
        <h3>Menu</h3>
        {navigation.link.map((item, i) => (
          <PrismicLink key={`link${i}`} field={item}>
            {item.text}
          </PrismicLink>
        ))}
      </div>
      {children}
    </div>
  );
};

export default Layout;
