'use client'

import { useState } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import styles from './Layout.module.scss';
import Link from 'next/link';


const Layout = ({ navigation, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(navigation)
  return (
    <div className={styles.layout}>
      <Link href="/" className={styles.logo}>
        Collectief Koppig
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
      <div className='prefooter'>
        {navigation.categories.map((item, i) => {
          return(
            <PrismicLink key={`link${i}`} field={item} className={item.text.toLowerCase()}>
              <h3>{item.text}</h3>
            </PrismicLink>
          )
        })}
      </div>
      <footer>
        {navigation.footer.map((item, i) => (
          <div className='column' key={`column${i}`}>
            <PrismicRichText field={item.column} />
          </div>
        ))}
      </footer>
    </div>
  );
};

export default Layout;
