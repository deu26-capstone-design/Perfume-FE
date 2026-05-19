import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { accordsApi, type PerfumeItem } from '@entities/accords/api/accordsApi';
import SimplePerfumeGrid from '@widgets/simple-perfume-grid/SimplePerfumeGrid';
import './AccordPerfumeList.css';

interface AccordPerfumeListProps {
  accordId: number;
}

const AccordPerfumeList = ({ accordId }: AccordPerfumeListProps) => {
  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState<PerfumeItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);
  const latestAccordIdRef = useRef(accordId);

  useEffect(() => {
    latestAccordIdRef.current = accordId;
  }, [accordId]);

  const fetchPerfumes = useCallback(
    async (targetPage: number, isReset: boolean = false) => {
      if (isFetchingRef.current && !isReset) return;

      isFetchingRef.current = true;
      setIsFetching(true);
      setError(null);

      try {
        const data = await accordsApi.getAccordPerfumes(accordId, targetPage, 30);

        if (accordId !== latestAccordIdRef.current) return;

        setPerfumes((prev) => (isReset ? data.content : [...prev, ...data.content]));
        setHasNext(data.hasNext);
        setPage(data.pageNum);
      } catch (error) {
        console.error('향수 목록을 불러오는데 실패했습니다.', error);
        if (accordId === latestAccordIdRef.current) {
          setError('향수 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
        }
      } finally {
        if (accordId === latestAccordIdRef.current) {
          isFetchingRef.current = false;
          setIsFetching(false);
        }
      }
    },
    [accordId],
  );

  useEffect(() => {
    setPerfumes([]);
    setError(null);
    setPage(0);
    setHasNext(false);
    isFetchingRef.current = false;
    setIsFetching(false);

    fetchPerfumes(0, true);
  }, [accordId, fetchPerfumes]);

  useEffect(() => {
    if (!hasNext || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPerfumes(page + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNext, isFetching, page, fetchPerfumes]);

  const gridPerfumes = useMemo(() => {
    return perfumes.map((perfume) => ({
      id: perfume.id,
      name: perfume.name,
      brand: perfume.brand,
      imageUrl: perfume.imageUrl || '',
    }));
  }, [perfumes]);

  if (error) {
    return <div className="accord-perfume-message">{error}</div>;
  }

  if (!isFetching && perfumes.length === 0) {
    return <div className="accord-perfume-message">해당 계열의 향수가 없습니다.</div>;
  }

  return (
    <div className="accord-perfume-list-wrapper">
      <SimplePerfumeGrid
        perfumes={gridPerfumes}
        onSelectPerfume={(perfume) => navigate(`/perfume/${perfume.id}`)}
      />

      {hasNext && (
        <div ref={observerRef} className="accord-perfume-observer">
          {isFetching && (
            <span className="accord-perfume-loading-text">향수 목록을 불러오는 중...</span>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordPerfumeList;
