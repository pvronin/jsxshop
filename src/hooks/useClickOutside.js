// src/hooks/useClickOutside.js
import { useEffect, useRef } from 'react';

export function useClickOutside(handler) {
  const ref = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [handler]);

  return ref;
}
