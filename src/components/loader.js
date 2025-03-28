'use client'
import { useState, useEffect, useRef } from 'react';
import styles from './Loader.module.scss';
import Home from '@/components/home'

const Loader = ({agenda}) => {
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);

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

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (!hasLoaded) {
      setIsFirstLoad(true);
      sessionStorage.setItem("hasLoaded", "true");
    }
  }, []);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map(src => 
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        })
      );

      await Promise.all(imagePromises);
      setShuffledImages(shuffleArray(images));
      setAssetsLoaded(true);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!assetsLoaded) return;

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }, 5400);

    return () => clearTimeout(hideTimeout);
  }, [assetsLoaded]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex + 1 >= shuffledImages.length) {
          setShuffledImages(shuffleArray(images));
          return 0;
        }
        return prevIndex + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [shuffledImages, isVisible]);

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  return (
    <>
      {isFirstLoad && assetsLoaded && (
        <div className={`${styles.loader} ${!isVisible ? styles.hidden : ''}`}>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            loop 
            onCanPlayThrough={() => setAssetsLoaded(true)}
          >
            <source src="/koppig2.mp4" type="video/mp4" />
          </video>
          <div className={styles.mondjes} style={{ maskImage: `url(${shuffledImages[index]})` }} />
        </div>
      )
    }
    {(!isFirstLoad || !isVisible) && (
      <Home agenda={agenda}/>
    )}
    </>
  );
};

export default Loader;
