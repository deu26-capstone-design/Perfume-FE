import ReviewButton from '@features/review/ui/ReviewButton';
import PerfumeReviewItem from './PerfumeReviewItem';
import { mockReviews } from '@entities/review/model/reviewMockData';
import '../styles/PerfumeReviewList.css';

export default function PerfumeReviewList() {
  return (
    <div className="review-list">
      <ReviewButton />
      <div className="review-list__items">
        {mockReviews.map((review, index) => (
          <PerfumeReviewItem key={index} review={review} />
        ))}
      </div>
    </div>
  );
}
