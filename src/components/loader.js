'use client'
import { useState, useEffect, useRef } from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  const images = [
    '/mondjes/SVG/mond1.svg',
    '/mondjes/SVG/mond2.svg',
    '/mondjes/SVG/mond3.svg',
    '/mondjes/SVG/mond4.svg',
    '/mondjes/SVG/mond5.svg',
    '/mondjes/SVG/mond6.svg',
    '/mondjes/SVG/mond7.svg',
    '/mondjes/SVG/mond8.svg'
  ];

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
  
  const [shuffledImages, setShuffledImages] = useState(shuffleArray(images));
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Hide loader and pause video after 4 seconds
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }, 4000);

    return () => clearTimeout(hideTimeout);
  }, []);

  useEffect(() => {
    if (!isVisible) return; // Stop interval if loader is hidden

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex + 1 >= shuffledImages.length) {
          setShuffledImages(shuffleArray(images)); // Reshuffle when all images are shown
          return 0; // Restart from the first image
        }
        return prevIndex + 1;
      });
    }, 300); // Change every 300ms

    return () => clearInterval(interval);
  }, [shuffledImages, isVisible]);

  return (
    <div className={`${styles.loader} ${!isVisible ? styles.hidden : ''}`}>
      <video ref={videoRef} autoPlay playsInline muted loop>
        <source src="/koppig-intro!.mp4" type="video/mp4" />
      </video>
      <div className={styles.mondjes} style={{ maskImage: `url(${shuffledImages[index]})` }}>
      </div>
    </div>
  );
};

export default Loader;
