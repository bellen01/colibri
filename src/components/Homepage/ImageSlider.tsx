'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/ImageSlider.module.scss';

const ImageSlider = () => {
    const colors = ['#40B1A6', '#E169BF', '#512F9D'];
    const [index, setIndex] = useState(0);
    const delay = 5000;

    useEffect(() => {
        setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === colors.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );
        return () => { };
    }, [index]);

    return (
        <div className={styles.slideshow}>
            <div className={styles.slideshowSlider} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {colors.map((backgroundColor, index) => (
                    <div className={styles.slide} key={index} style={{ backgroundColor }} />
                ))}
            </div>
            {/* <div className={styles.slideshowDots}>
                {colors.map((_, idx) => (
                    <div key={idx} className={`styles.slideshowDot${index === idx ? 'active' : ''}`}></div>
                ))}
            </div> */}
        </div>
    )
}

export default ImageSlider