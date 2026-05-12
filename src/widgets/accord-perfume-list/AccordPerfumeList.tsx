import { useState, useEffect, useRef } from 'react';
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

  const fetchPerfumes = async (targetPage: number, isReset: boolean = false) => {
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
  };

  useEffect(() => {
    fetchPerfumes(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNext, isFetching, page]);

  // 🌟 핵심 해결 포인트: SimplePerfumeGrid가 딱 원하는 모양으로만 데이터를 재조립합니다.
  const DEFAULT_IMAGE = 'https://fimgs.net/mdimg/perfume-thumbs/375x500.10806.webp'; // 임시 이미지

  const gridPerfumes = perfumes.map((perfume) => ({
    id: perfume.id,
    name: perfume.name,
    brand: perfume.brand,
    imageUrl: perfume.imageUrl ?? DEFAULT_IMAGE, // null일 경우 기본 이미지 삽입
  }));

  return (
    <div className="accord-perfume-list-wrapper">
      {/* 🌟 원본 perfumes가 아니라, 가공된 gridPerfumes를 넘겨줍니다! */}
      <SimplePerfumeGrid
        perfumes={gridPerfumes}
        onSelectPerfume={(perfume) => navigate(`/perfume/${perfume.id}`)}
      />

      {hasNext && (
        <div ref={observerRef} className="h-20 flex justify-center items-center mt-8">
          {isFetching && (
            <span className="text-gray-500 font-medium">향수 목록을 불러오는 중...</span>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordPerfumeList;
