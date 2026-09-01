import { useEffect, useRef } from 'react';

const useMouseGlow = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let frame = 0;

    const handleMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        current.style.setProperty('--cursor-x', `${e.clientX}px`);
        current.style.setProperty('--cursor-y', `${e.clientY}px`);
        frame = 0;
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
};

export default useMouseGlow;