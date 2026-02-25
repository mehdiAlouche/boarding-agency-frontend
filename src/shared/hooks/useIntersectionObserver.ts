import { RefObject, useEffect } from 'react';

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  onIntersect: () => void,
  options?: IntersectionObserverInit,
) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [onIntersect, options, ref]);
}
