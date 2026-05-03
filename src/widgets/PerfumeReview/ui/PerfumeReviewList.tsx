import { useState } from 'react';
import ReviewButton from '@features/review/ui/ReviewButton';
import ReviewFormModal from '@features/review/ui/ReviewFormModal';
import PerfumeReviewItem from './PerfumeReviewItem';
import { mockReviews } from '@entities/review/model/reviewMockData';
import type { Review } from '@entities/review/model/types';
import '../styles/PerfumeReviewList.css';

export default function PerfumeReviewList() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="review-list">
      <ReviewButton onClick={() => setIsModalOpen(true)} />
      <div className="review-list__items">
        {reviews.map((review, index) => (
          <PerfumeReviewItem key={index} review={review} />
        ))}
      </div>
      {isModalOpen && (
        <ReviewFormModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
