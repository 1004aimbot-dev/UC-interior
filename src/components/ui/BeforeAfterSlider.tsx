import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './BeforeAfterSlider.module.css';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    altText?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage, altText = "Before and After comparison" }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setSliderPosition(percentage);
        }
    }, []);

    const onMouseDown = () => setIsDragging(true);
    const onTouchStart = () => setIsDragging(true);

    const onMouseUp = () => setIsDragging(false);
    const onTouchEnd = () => setIsDragging(false);

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) handleMove(e.clientX);
    }, [isDragging, handleMove]);

    const onTouchMove = useCallback((e: TouchEvent) => {
        if (isDragging) handleMove(e.touches[0].clientX);
    }, [isDragging, handleMove]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [isDragging, onMouseMove, onTouchMove]);

    return (
        <div
            className={styles.container}
            ref={containerRef}
            role="img"
            aria-label={altText}
        >
            <div className={styles.imageWrapper}>
                <img
                    src={afterImage}
                    alt="After"
                    className={styles.image}
                />
                <span className={styles.label} style={{ right: '20px' }}>AFTER</span>
            </div>

            <div
                className={styles.imageWrapper}
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className={styles.image}
                />
                <span className={styles.label} style={{ left: '20px' }}>BEFORE</span>
            </div>

            <div
                className={styles.sliderHandle}
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
            >
                <div className={styles.sliderLine} />
                <div className={styles.sliderButton}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                        <path d="M9 18l6-6-6-6" transform="rotate(180 12 12)" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
