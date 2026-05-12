import { useState, useEffect, useCallback } from 'react';
import type { Perfume } from '@entities/perfume/model/types';
import { getPerfumes } from '@entities/perfume/api/perfumeApi';
import { useInfiniteScroll } from '@shared/lib/useInfiniteScroll';

interface UseLayeringPerfumesProps {
  keyword: string;
  accords: string[];
}

export const useLayeringPerfumes = ({ keyword, accords }: UseLayeringPerfumesProps) => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  // 검색어나 accord 변경 시 초기화
  useEffect(() => {
    setPage(0);
    setHasNext(true);
  }, [keyword, accords.join(',')]);

  // 향수 목록 조회
  useEffect(() => {
    let isMounted = true;

    const fetchPerfumes = async () => {
      setIsLoading(true);
      try {
        setFetchError(false);

        const response = await getPerfumes({
          keyword: keyword || undefined,
          accord: accords.length > 0 ? accords : undefined,
          page,
          size: 30,
          sort: 'rating_desc',
        });

        const data = response.data;

        if (!isMounted) return;

        setPerfumes((prev) => (page === 0 ? data.content : [...prev, ...data.content]));

        setHasNext(data.hasNext);
      } catch (error) {
        setFetchError(true);

        console.error('향수 목록 조회 실패', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPerfumes();

    return () => {
      isMounted = false;
    };
  }, [keyword, accords.join(','), page]);

  // 무한 스크롤
  const handleLoadMore = useCallback(() => {
    if (!hasNext || isLoading || perfumes.length === 0) return;

    setPage((prev) => prev + 1);
  }, [hasNext, isLoading, perfumes.length]);

  const sentinelRef = useInfiniteScroll(handleLoadMore);

  return {
    perfumes,
    hasNext,
    isLoading,
    fetchError,
    sentinelRef,
  };
};
