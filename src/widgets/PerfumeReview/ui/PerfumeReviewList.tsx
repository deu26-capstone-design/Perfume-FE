import { useCallback, useEffect, useRef, useState } from 'react';
import ReviewButton from '@features/review/ui/ReviewButton';
import ReviewFormModal from '@features/review/ui/ReviewFormModal';
import { useInfiniteScroll } from '@shared/lib/useInfiniteScroll';
import PerfumeReviewItem from './PerfumeReviewItem';
import { getReviews } from '@entities/perfume/api/perfumeApi';
import type { Review } from '@entities/review/model/types';
import '../styles/PerfumeReviewList.css';

interface Props {
  perfumeId: number;
}

export default function PerfumeReviewList({ perfumeId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const pendingResetRef = useRef(false);

  useEffect(() => {
    pendingResetRef.current = true;
    setPage(0);
    setReviews([]);
  }, [perfumeId]);

  useEffect(() => {
    if (pendingResetRef.current) {
      if (page !== 0) return;
      pendingResetRef.current = false;
    }

    let cancelled = false;
    setIsLoading(true);
    getReviews(perfumeId, page)
      .then((res) => {
        if (cancelled) return;
        const items = res.data.content;
        setReviews((prev) => (page === 0 ? items : [...prev, ...items]));
        setHasMore(res.data.hasNext);
      })
      .catch(() => { if (!cancelled) setHasMore(false); })
      .finally(() => { if (!cancelled) setIsLoading(false); });

    return () => { cancelled = true; };
  }, [perfumeId, page, refreshKey]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setPage((prev) => prev + 1);
  }, [hasMore, isLoading]);

  const sentinelRef = useInfiniteScroll(handleLoadMore);

  const handleSubmit = () => {
    setIsModalOpen(false);
    setPage(0);
    setReviews([]);
    pendingResetRef.current = true;
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="review-list">
      <ReviewButton onClick={() => setIsModalOpen(true)} />
      <div className="review-list__items">
        {!isLoading && reviews.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--gray-400)' }}>
            아직 작성된 리뷰가 없어요!
          </p>
        ) : (
          reviews.map((review, index) => (
            <PerfumeReviewItem key={index} review={review} />
          ))
        )}
      </div>
      {hasMore && <div ref={sentinelRef} />}
      {isLoading && <p style={{ textAlign: 'center', padding: '1rem 0', color: 'var(--gray-400)' }}>불러오는 중...</p>}
      {isModalOpen && (
        <ReviewFormModal
          perfumeId={perfumeId}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
