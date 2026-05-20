import { useState } from 'react';
import MyReviewItem, { type MyReviewType } from '@features/review/ui/MyReviewItem';
import { myReviewMockData } from './model/mockData';
import ReviewFormModal from '@features/review/ui/ReviewFormModal';
import './MyReviewList.css';

export default function MyReviewList() {
  const [reviews, setReviews] = useState<MyReviewType[]>([...myReviewMockData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<MyReviewType | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    const targetReview = reviews.find((r) => r.id === id);
    if (targetReview) {
      setSelectedReview(targetReview);
      setIsModalOpen(true);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteTargetId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId !== null) {
      setReviews((prev) => prev.filter((r) => r.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleSubmitModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
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
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {isModalOpen && selectedReview && (
        <ReviewFormModal
          perfumeId={selectedReview.perfumeId}
          editData={{
            reviewId: selectedReview.id,
            satisfaction: selectedReview.satisfaction,
            longevity: selectedReview.longevity,
            seasons: selectedReview.seasons || [],
            scents: selectedReview.scents || [],
            comment: selectedReview.comment || '',
          }}
          onClose={handleCloseModal}
          onSubmit={handleSubmitModal}
        />
      )}

      {deleteTargetId !== null && (
        <div className="modal-overlay" onClick={() => setDeleteTargetId(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="confirm-modal__title">리뷰 삭제</h3>
            <p className="confirm-modal__message">리뷰를 삭제하시겠습니까?</p>
            <div className="confirm-modal__actions">
              <button className="cancel-btn" onClick={() => setDeleteTargetId(null)}>
                취소
              </button>
              <button className="delete-btn" onClick={handleConfirmDelete}>
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
