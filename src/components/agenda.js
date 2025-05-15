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
          {page.data.tijd &&  
            <p><b>Tijd</b> {page.data.tijd}</p>
          }
          {page.data.programma.length > 0 &&
            <div className={styles.flex}><b>Programma&nbsp;</b> <PrismicRichText field={page.data.programma}/></div>
          }
          {page.data.waar.length > 0 &&
              <div className={styles.flex}><b>Waar&nbsp;</b> <PrismicRichText field={page.data.waar}/></div>
          }
        </div>
        
      </div>

    </div>
  );
};

export default Agenda;
