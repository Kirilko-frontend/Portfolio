import { useEffect, useRef, useState } from 'react';

const useReveal = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, []);

  return { ref, isVisible };
};

export default useReveal;
