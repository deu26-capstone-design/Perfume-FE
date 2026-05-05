import { useEffect, useRef } from 'react';

export function useInfiniteScroll(onLoadMore: () => void) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoadingRef.current) {
          isLoadingRef.current = true;
          onLoadMore();
          setTimeout(() => {
            isLoadingRef.current = false;
            // 센티넬이 여전히 뷰포트에 있으면 재감지 강제 트리거
            if (observerRef.current && sentinel) {
              observerRef.current.unobserve(sentinel);
              observerRef.current.observe(sentinel);
            }
          }, 0);
        }
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(sentinel);
    return () => observerRef.current?.disconnect();
  }, [onLoadMore]);

  return sentinelRef;
}
