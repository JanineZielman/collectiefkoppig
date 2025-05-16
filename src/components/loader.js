'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Loader.module.scss';
import Home from '@/components/home';

const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

const Loader = ({ agenda, intro }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (!hasLoaded) {
      setIsFirstLoad(true);
      sessionStorage.setItem('hasLoaded', 'true');
    }
  }, []);

  useEffect(() => {
    const preloadAssets = async () => {
      const mondjes = intro?.data?.mondjes || [];
      const videos = intro?.data?.videos || [];

      const preload = mondjes.map((item) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = item.image.url;
          img.onload = () => resolve(item);
        })
      );

      await Promise.all(preload);
      setShuffledImages(shuffleArray(mondjes));

      // Select a random video
      if (videos.length > 0) {
        const randomIndex = Math.floor(Math.random() * videos.length);
        setSelectedVideo(videos[randomIndex]);
      }

      setAssetsLoaded(true);
    };

    preloadAssets();
  }, [intro]);

  useEffect(() => {
    if (!assetsLoaded || !isVisible || !videoRef.current) return;

    const video = videoRef.current;

    const handleCanPlay = () => {
      video.play().catch(() => {
        // AutoPlay blocked: still proceed visually
      });
    };

    const handleEnded = () => {
      setIsVisible(false);
    };

    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [assetsLoaded, isVisible]);

  useEffect(() => {
    if (!assetsLoaded || !isVisible) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= shuffledImages.length) {
          setShuffledImages(shuffleArray(shuffledImages));
          return 0;
        }
        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [assetsLoaded, isVisible, shuffledImages]);

  return (
    <>
      {isFirstLoad && assetsLoaded && (
        <div className={`${styles.loader} ${!isVisible ? styles.hidden : ''}`}>
          {selectedVideo && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              loop={false}
              preload="auto"
              className={styles.video}
            >
              <source src={selectedVideo.video.url} type="video/mp4" />
            </video>
          )}

          <div className={styles.mondjesWrapper}>
            {shuffledImages.map((item, i) => (
              <img
                key={i}
                src={item.image.url}
                className={`${styles.mondjes} ${i === index ? styles.visible : ''}`}
                alt=""
              />
            ))}
          </div>
        </div>
      )}
      {(!isFirstLoad || !isVisible) && <Home agenda={agenda} />}
    </>
  );
};

export default Loader;
