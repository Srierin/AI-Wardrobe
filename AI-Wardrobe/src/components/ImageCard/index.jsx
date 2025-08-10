import styles from './imagecard.module.css';
import { useRef, useEffect } from 'react';

const ImageCard = (props) => {
  const { url, height } = props;
  const imgRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const oImg = document.createElement('img');
        oImg.src = img.dataset.src;
        oImg.onload = function() {
          img.src = img.dataset.src;
          img.style.opacity = 1;
          img.style.transition = 'opacity 0.5s ease';
        }
        obs.unobserve(img);
      }
    }, {
      threshold: 0.1
    });
    
    if (imgRef.current) observer.observe(imgRef.current);
    
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <div style={{ height: `${height}px` }} className={styles.card}>
      <img 
        ref={imgRef} 
        data-src={url} 
        className={styles.img}
        style={{ opacity: 0 }}
        alt="时尚穿搭"
      />
    </div>
  );
};

export default ImageCard;