import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PerfumeInfo from '@widgets/PerfumeInfo/ui/PerfumeInfo';
import PerfumeReviewSummary from '@widgets/PerfumeReview/ui/PerfumeReviewSummary';
import PerfumeReviewList from '@widgets/PerfumeReview/ui/PerfumeReviewList';
import { getPerfumeDetail } from '@entities/perfume/api/perfumeApi';
import type { PerfumeDetail } from '@entities/perfume/model/detailTypes';

export default function PerfumeDetailPage() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState<PerfumeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setIsLoading(true);
    getPerfumeDetail(Number(id))
      .then((res) => { if (!cancelled) setPerfume(res.data); })
      .catch((err) => {
        if (cancelled) return;
        if (err.response?.status === 404) setNotFound(true);
        else setFetchError(true);
      })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (isLoading) return <p style={{ textAlign: 'center', padding: '4rem 0' }}>불러오는 중...</p>;
  if (notFound) return <p style={{ textAlign: 'center', padding: '4rem 0' }}>향수 정보를 찾을 수 없어요.</p>;
  if (fetchError || !perfume) return <p style={{ textAlign: 'center', padding: '4rem 0' }}>향수 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.</p>;

  return (
    <>
      <PerfumeInfo perfume={perfume} />
      <PerfumeReviewSummary
        reviewCount={perfume.reviewCount}
        satisfaction={perfume.satisfaction}
        longevity={perfume.longevity}
        seasons={perfume.seasons}
      />
      <PerfumeReviewList />
    </>
  );
}
