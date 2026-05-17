import { useState } from 'react';
import MyReviewItem, { type MyReviewType } from '@features/review/ui/MyReviewItem';
import { myReviewMockData } from './model/mockData';
import './MyReviewList.css';

export default function MyReviewList() {
  const [reviews, setReviews] = useState<MyReviewType[]>([...myReviewMockData]);

  const handleEdit = (id: number) => {
    alert(`리뷰 ${id}번 수정 모달을 띄웁니다.`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  if (reviews.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-400)' }}>
        작성한 리뷰가 없습니다.
      </div>
    );
  }

  return (
    <div className="my-review-list-container">
      <header className="my-review-list__header">
        <h2 className="my-review-list__title">내가 작성한 리뷰</h2>
        <p className="my-review-list__count">리뷰 {reviews.length}</p>
      </header>

      <div className="my-review-list__items">
        {reviews.map((review) => (
          <MyReviewItem
            key={review.id}
            review={review}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
