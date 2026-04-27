import { useRef, useEffect, useState } from "react";

export const useCounterAnimation = (targetNumber: number, isVisible: boolean, duration: number = 1500) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      countRef.current = 0;
      return;
    }

    const increment = targetNumber / (duration / 16); // ~60fps
    const startTime = Date.now();

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newCount = Math.floor(progress * targetNumber);

      if (newCount !== countRef.current) {
        countRef.current = newCount;
        setCount(newCount);
      }

      if (progress < 1) {
        animationRef.current = setTimeout(updateCount, 16);
      }
    };

    animationRef.current = setTimeout(updateCount, 16);

    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [isVisible, targetNumber, duration]);

  return count;
};
