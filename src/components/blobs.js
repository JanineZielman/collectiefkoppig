'use client'
// Import required dependencies
import { useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './Blobs.module.css';
import Link from 'next/link';


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
          <circle className="blob" cx="10vw" cy="10vw" r="7vw" />
          <circle className="blob" cx="11vw" cy="15vw" r="10vw" />
          <text x="11vw" y="15vw" fontSize="3vw" fill="black" textAnchor="middle" alignmentBaseline="middle">
            <Link href="/kunst">KUNST</Link>
          </text>

          <circle className="blob" cx="21vw" cy="20vw" r="3vw" />
          <ellipse className="blob" cx="26vw" cy="23vw" rx="16vw" ry="1vw" />
          <ellipse className="blob" cx="42vw" cy="25vw" rx="2vw" ry="3vw" />



          <circle className="blob" cx="43vw" cy="30vw" r="4vw" />

          <ellipse className="blob" cx="40vw" cy="38vw" rx="1vw" ry="7vw" />

          <ellipse className="blob" cx="30vw" cy="47vw" rx="13vw" ry="10vw" />
          <circle className="blob" cx="20vw" cy="50vw" r="8vw" />
          <text x="30vw" y="47vw" fontSize="3vw" fill="black" textAnchor="middle" alignmentBaseline="middle">
            <Link href="/onderwijs">ONDERWIJS</Link>
          </text>

          <ellipse className="blob" cx="55vw" cy="30vw" rx="10vw" ry="1vw" />
          <ellipse className="blob" cx="68vw" cy="30vw" rx="4vw" ry="3vw" />


          <ellipse className="blob" cx="80vw" cy="30vw" rx="18vw" ry="20vw" />
          <circle className="blob" cx="70vw" cy="20vw" r="9vw" />
          <ellipse className="blob" cx="70vw" cy="40vw" rx="15vw" ry="10vw" />
          <text x="80vw" y="30vw" fontSize="3vw" fill="black" textAnchor="middle" alignmentBaseline="middle">
            <Link href="/maatschappij">MAATSCHAPPIJ</Link>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Blobs;
