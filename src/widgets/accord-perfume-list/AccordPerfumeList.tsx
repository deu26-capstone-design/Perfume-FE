import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { accordsApi, type PerfumeItem } from '@entities/accords/api/accordsApi';
import SimplePerfumeGrid from '@widgets/simple-perfume-grid/SimplePerfumeGrid';

interface AccordPerfumeListProps {
  accordId: number;
}

const AccordPerfumeList = ({ accordId }: AccordPerfumeListProps) => {
  const navigate = useNavigate();

  const [perfumes, setPerfumes] = useState<PerfumeItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);
  const DEFAULT_IMAGE = 'https://fimgs.net/mdimg/perfume-thumbs/375x500.10806.webp';

  const fetchPerfumes = useCallback(
    async (targetPage: number, isReset: boolean = false) => {
      if (isFetching) return;
      setIsFetching(true);
      try {
        const data = await accordsApi.getAccordPerfumes(accordId, targetPage, 30);
        setPerfumes((prev) => (isReset ? data.content : [...prev, ...data.content]));
        setHasNext(data.hasNext);
        setPage(data.pageNum);
      } catch (error) {
        console.error('향수 목록을 불러오는데 실패했습니다.', error);
      } finally {
        setIsFetching(false);
      }
    },
    [accordId, isFetching],
  );

  useEffect(() => {
    setPerfumes([]);
    fetchPerfumes(0, true);
  }, [accordId]);

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

  const gridPerfumes = perfumes.map((perfume) => ({
    id: perfume.id,
    name: perfume.name,
    brand: perfume.brand,
    imageUrl: perfume.imageUrl ?? DEFAULT_IMAGE,
  }));

  if (!isFetching && perfumes.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--gray-500)' }}>
        해당 계열의 향수가 없습니다.
      </div>
    );
  }

  return (
    <div className="accord-perfume-list-wrapper">
      <SimplePerfumeGrid
        perfumes={gridPerfumes}
        onSelectPerfume={(perfume) => navigate(`/perfume/${perfume.id}`)}
      />

      {hasNext && (
        <div
          ref={observerRef}
          style={{ height: '40px', display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        >
          {isFetching && (
            <span style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
              향수 목록을 불러오는 중...
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordPerfumeList;
