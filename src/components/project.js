'use client'

import { PrismicNextImage } from '@prismicio/next';
import styles from './Project.module.scss';
import { PrismicRichText } from '@prismicio/react';

const Project = ({page}) => {
  console.log(page)
  return (
    <div className={styles.projectPage}>
      <h1 className="page-title">{page.data.title}</h1>
      <div className={styles.hero}>    
        {page.data.images?.length > 0 ?
          <>
            <div className={`${styles.images} images-${page.data.images?.length}`}>
              {page.data.images?.map((item, i) => (
                <div className={`${styles.imageWrapper} image-wrapper`}  key={`images${i}`}>
                  <PrismicNextImage field={item.image} />
                </div>
              ))}
            </div>
            {page.data.images[0].image.alt &&
              <div className={styles.captions}>
                {page.data.images?.map((item, i) => (
                  <>
                  {item.image.alt &&
                  <div className={styles.caption} key={`caption${i}`}>
                    {i + 1}. {item.image.alt}
                  </div>
                  }
                  </>
                ))}
              </div>
            }
          </>
          :
          <>
          <div className={styles.single}><PrismicNextImage field={page.data.image}/></div>
          {page.data.image.alt &&
            <div className={styles.captions}>
              <div className={styles.caption}>
                {page.data.image.alt}
              </div>
            </div>
          }
          </>
        }
      </div>
      
      <div className={styles.introText}>
        <PrismicRichText field={page.data.description}/>
      </div>

    </div>
  );
};

export default Project;
