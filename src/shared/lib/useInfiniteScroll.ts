import { useRef, useCallback } from 'react';

export function useInfiniteScroll(onLoadMore: () => void) {
  const isLoadingRef = useRef(false);
  const onLoadMoreRef = useRef(onLoadMore);
  onLoadMoreRef.current = onLoadMore;

  const sentinelRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoadingRef.current) {
          isLoadingRef.current = true;
          onLoadMoreRef.current();
          setTimeout(() => {
            isLoadingRef.current = false;
            observer.unobserve(node);
            observer.observe(node);
          }, 0);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return sentinelRef;
}
