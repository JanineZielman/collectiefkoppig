'use client'
// Import required dependencies
import { useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './Blobs.module.css';

const Blobs = () => {
  useEffect(() => {
    const blobs = document.querySelectorAll('.blob');
    const texts = document.querySelectorAll('text');
    const radius = 8;

    blobs.forEach((blob, index) => {
      const correspondingText = texts[index];
      
      // Generate random initial rotation and duration
      const initialRotation = Math.random() * 360; // Random start rotation
      const randomDuration = 5 + Math.random() * 2; // Random duration between 3 and 5 seconds

      const commonProps = {
        attr: {
          transform: `rotate(${initialRotation}) translate(${radius}, 0.1) rotate(${-initialRotation})`,
        },
      };

      gsap.fromTo(
        blob,
        commonProps,
        {
          attr: {
            transform: `rotate(${initialRotation + 360}) translate(${radius}, 0.1) rotate(${-initialRotation - 360})`,
          },
          ease: 'linear',
          repeat: -1,
          duration: randomDuration,
        }
      );

      gsap.fromTo(
        correspondingText,
        commonProps,
        {
          attr: {
            transform: `rotate(${initialRotation + 360}) translate(${radius}, 0.1) rotate(${-initialRotation - 360})`,
          },
          ease: 'linear',
          repeat: -1,
          duration: randomDuration,
        }
      );
    });
  }, []);

  return (
    <div className={styles.loadingCont}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.loader}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>

        <g className={styles.blobs}>
        <ellipse className="blob" cx="25vw" cy="20vw" rx="50vw" ry="3vw" />
        <ellipse className="blob" cx="60vw" cy="30vw" rx="30vw" ry="27vw" />
          <circle className="blob" cx="42vw" cy="22vw" r="16vw" />
          <ellipse className="blob" cx="44vw" cy="42vw" rx="22vw" ry="17vw" />
        </g>
      </svg>
    </div>
  );
};

export default Blobs;
