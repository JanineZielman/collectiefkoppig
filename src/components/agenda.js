'use client'

import { PrismicNextImage } from '@prismicio/next';
import styles from './Agenda.module.scss';
import { PrismicRichText } from '@prismicio/react';

const Agenda = ({page}) => {
  return (
    <div className={styles.agendaPage}>
      <h1 className="page-title">{page.data.title}</h1>
      <div className={styles.image}><PrismicNextImage field={page.data.image}/></div>
      
      <div className={styles.textWrapper}>
        <div className={styles.description}>
          <PrismicRichText field={page.data.description}/>
        </div>
        <div className={styles.info}>
          <PrismicRichText field={page.data.info}/>
        </div>
        
      </div>

    </div>
  );
};

export default Agenda;
