// src/hooks/useScrollBehavior.js
import { useEffect, useRef, useState } from 'react';

export function useScrollBehavior(threshold = 2) {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > threshold) {
        setShow(currentScrollY <= lastScrollY.current || currentScrollY <= threshold);
        lastScrollY.current = currentScrollY;
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [threshold]);

  return show;
}
