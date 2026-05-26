import { useState, useEffect } from 'react';
import MyReviewItem, { type MyReviewType } from '@features/review/ui/MyReviewItem';
import ReviewFormModal from '@features/review/ui/ReviewFormModal';
import { getMyReviews, deleteReview } from '@entities/review/api/reviewApi';
import './MyReviewList.css';

export default function MyReviewList() {
  const [reviews, setReviews] = useState<MyReviewType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<MyReviewType | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const data = await getMyReviews(0, 30);

      const mappedReviews: MyReviewType[] = data.content.map((item: any) => ({
        id: item.reviewId,
        perfumeId: item.perfumeId,
        perfumeName: item.perfumeName,
        brandName: item.brand,
        imageUrl: item.perfumeImageUrl,
        satisfaction: item.satisfaction,
        longevity: item.longevity,
        seasons: item.seasons,
        scents: item.scents,
        comment: item.comment,
        createdAt: item.createdAt,
      }));

      setReviews(mappedReviews);
      setTotalCount(data.totalElements);
    } catch (error) {
      console.error('리뷰 목록을 불러오지 못했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

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

  const handleConfirmDelete = async () => {
    if (deleteTargetId !== null) {
      try {
        await deleteReview(deleteTargetId);
        setReviews((prev) => prev.filter((r) => r.id !== deleteTargetId));
        setTotalCount((prev) => prev - 1);
        setDeleteTargetId(null);
      } catch (error) {
        alert('리뷰 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleSubmitModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
    fetchReviews();
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-400)' }}>
        리뷰 목록을 불러오는 중입니다...
      </div>
    );
  }

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
        <p className="my-review-list__count">리뷰 {totalCount}</p>
      </header>

      <div className="my-review-list__items">
        {reviews.map((review) => (
          <MyReviewItem
            key={review.id}
            review={review}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            isMyPage={true}
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
            <p className="confirm-modal__message">
              정말 리뷰를 삭제하시겠습니까?
              <br />
              삭제 후에는 복구할 수 없습니다.
            </p>
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
