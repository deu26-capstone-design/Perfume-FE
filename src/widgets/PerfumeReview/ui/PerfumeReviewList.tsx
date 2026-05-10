import { useCallback, useEffect, useState } from 'react';
import ReviewButton from '@features/review/ui/ReviewButton';
import ReviewFormModal from '@features/review/ui/ReviewFormModal';
import { useInfiniteScroll } from '@shared/lib/useInfiniteScroll';
import PerfumeReviewItem from './PerfumeReviewItem';
import { getReviews } from '@entities/perfume/api/perfumeApi';
import type { Review } from '@entities/review/model/types';
import '../styles/PerfumeReviewList.css';

interface Props {
  perfumeId: number;
  onReviewSubmit?: () => void;
}

export default function PerfumeReviewList({ perfumeId, onReviewSubmit }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [hasFirstLoaded, setHasFirstLoaded] = useState(false);

  useEffect(() => {
    setPage(0);
    setFetchError(false);
    setHasFirstLoaded(false);
  }, [perfumeId]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    getReviews(perfumeId, page)
      .then((res) => {
        if (cancelled) return;
        const items = res.data.content;
        setReviews((prev) => (page === 0 ? items : [...prev, ...items]));
        setHasMore(res.data.hasNext);
      })
      .catch(() => {
        if (!cancelled) {
          setHasMore(false);
          setFetchError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
          setHasFirstLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [perfumeId, page, refreshKey]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading || reviews.length === 0) return;
    setPage((prev) => prev + 1);
  }, [hasMore, isLoading, reviews.length]);

  const sentinelRef = useInfiniteScroll(handleLoadMore);

  const handleSubmit = () => {
    setIsModalOpen(false);
    setPage(0);
    setRefreshKey((prev) => prev + 1);
    onReviewSubmit?.();
  };

  return (
    <div className="review-list">
      <ReviewButton onClick={() => setIsModalOpen(true)} />
      <div className="review-list__items">
        {isLoading && !hasFirstLoaded ? (
          <p style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--gray-400)' }}>
            불러오는 중...
          </p>
        ) : fetchError ? (
          <p style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--gray-400)' }}>
            리뷰를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
          </p>
        ) : reviews.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--gray-400)' }}>
            아직 작성된 리뷰가 없어요!
          </p>
        ) : (
          reviews.map((review) => (
            <PerfumeReviewItem key={`${review.nickname}-${review.createdAt}`} review={review} />
          ))
        )}
      </div>
      {hasMore && <div ref={sentinelRef} />}
      {isLoading && hasFirstLoaded && (
        <p style={{ textAlign: 'center', padding: '1rem 0', color: 'var(--gray-400)' }}>
          불러오는 중...
        </p>
      )}
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
