import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 150,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const [completedAnimations, setCompletedAnimations] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (completedAnimations === elements.length && onAnimationComplete) {
      onAnimationComplete();
    }
  }, [completedAnimations, elements.length, onAnimationComplete]);

  const handleAnimationComplete = (index: number) => {
    if (index === elements.length - 1) {
      setCompletedAnimations(prev => prev + 1);
    }
  };

  return (
    <p ref={ref} className={`${className} flex flex-wrap`}>
      <AnimatePresence>
        {inView && elements.map((element, index) => (
          <motion.span
            key={index}
            initial={{
              filter: 'blur(10px)',
              opacity: 0,
              y: direction === 'top' ? -50 : 50,
            }}
            animate={{
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: index * (delay / 1000), // convert ms to seconds
              ease: "easeOut",
            }}
            onAnimationComplete={() => handleAnimationComplete(index)}
            className="inline-block will-change-[transform,filter,opacity]"
          >
            {element === ' ' ? '\u00A0' : element}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </AnimatePresence>
    </p>
  );
};

export default BlurText;