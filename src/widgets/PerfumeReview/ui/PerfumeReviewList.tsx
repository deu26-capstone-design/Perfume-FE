import { useCallback, useState } from 'react';
import ReviewButton from '@features/review/ui/ReviewButton';
import ReviewFormModal from '@features/review/ui/ReviewFormModal';
import { useInfiniteScroll } from '@shared/lib/useInfiniteScroll';
import PerfumeReviewItem from './PerfumeReviewItem';
import { mockReviews } from '@entities/review/model/reviewMockData';
import type { Review } from '@entities/review/model/types';
import '../styles/PerfumeReviewList.css';

//5개씩 로드되게 구현(추후 수정 가능)
const PAGE_SIZE = 5;

export default function PerfumeReviewList() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, reviews.length));
  }, [reviews.length]);

  const sentinelRef = useInfiniteScroll(handleLoadMore);

  const handleSubmit = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="review-list">
      <ReviewButton onClick={() => setIsModalOpen(true)} />
      <div className="review-list__items">
        {reviews.slice(0, visibleCount).map((review, index) => (
          <PerfumeReviewItem key={index} review={review} />
        ))}
      </div>
      {visibleCount < reviews.length && <div ref={sentinelRef} />}
      {isModalOpen && (
        <ReviewFormModal onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
