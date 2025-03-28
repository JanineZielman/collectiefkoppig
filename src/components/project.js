'use client'

import { PrismicNextImage } from '@prismicio/next';
import styles from './Project.module.scss';
import { PrismicRichText } from '@prismicio/react';

const Project = ({page}) => {
  return (
    <div className={styles.projectPage}>
      <h1 className="page-title">{page.data.title}</h1>
      <div className={styles.hero}>    
        {page.data.images?.length > 0 ?
          <div className={styles.images}>
            {page.data.images?.map((item, i) => (
              <PrismicNextImage field={item.image} key={`images${i}`} />
            ))}
          </div>
          :
          <div className={styles.single}><PrismicNextImage field={page.data.image}/></div>
        }
      </div>
      
      <div className={styles.introText}>
        <PrismicRichText field={page.data.description}/>
      </div>

    </div>
  );
};

export default Project;
