import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReviewButton from '@features/review/ui/ReviewButton';
import ReviewFormModal from '@features/review/ui/ReviewFormModal';
import { useInfiniteScroll } from '@shared/lib/useInfiniteScroll';
import { useAuth } from '@features/auth/model/useAuth';
import PerfumeReviewItem from './PerfumeReviewItem';
import { getReviews, getMyReview } from '@entities/perfume/api/perfumeApi';
import type { Review } from '@entities/review/model/types';
import '../styles/PerfumeReviewList.css';

interface Props {
  perfumeId: number;
  onReviewSubmit?: () => void;
}

export default function PerfumeReviewList({ perfumeId, onReviewSubmit }: Props) {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const [fetchError, setFetchError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [hasFirstLoaded, setHasFirstLoaded] = useState(false);
  const [isCheckingReview, setIsCheckingReview] = useState(false);
  const [alreadyReviewedMsg, setAlreadyReviewedMsg] = useState<string | null>(null);
  const alreadyReviewedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setPage(0);
    setFetchError(false);
    setHasFirstLoaded(false);
  }, [perfumeId]);

  useEffect(() => {
    return () => {
      if (alreadyReviewedTimer.current) clearTimeout(alreadyReviewedTimer.current);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    isLoadingRef.current = true;
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
        isLoadingRef.current = false;
      });

    return () => {
      cancelled = true;
    };
  }, [perfumeId, page, refreshKey]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoadingRef.current || reviews.length === 0) return;
    isLoadingRef.current = true;
    setPage((prev) => prev + 1);
  }, [hasMore, reviews.length]);

  const sentinelRef = useInfiniteScroll(handleLoadMore);

  const handleSubmit = () => {
    setIsModalOpen(false);
    setPage(0);
    setRefreshKey((prev) => prev + 1);
    onReviewSubmit?.();
  };

  const handleReviewButtonClick = async () => {
    if (!isLogin) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    setIsCheckingReview(true);
    try {
      const res = await getMyReview(perfumeId);
      if (res.status === 200) {
        if (alreadyReviewedTimer.current) clearTimeout(alreadyReviewedTimer.current);
        setAlreadyReviewedMsg('이미 리뷰를 작성한 향수예요.');
        alreadyReviewedTimer.current = setTimeout(() => setAlreadyReviewedMsg(null), 2000);
      } else {
        // 204(리뷰 없음) 또는 404(리뷰 없음) 모두 신규 작성 모달 오픈
        setIsModalOpen(true);
      }
    } catch {
      if (alreadyReviewedTimer.current) clearTimeout(alreadyReviewedTimer.current);
      setAlreadyReviewedMsg('잠시 후 다시 시도해주세요.');
      alreadyReviewedTimer.current = setTimeout(() => setAlreadyReviewedMsg(null), 2000);
    } finally {
      setIsCheckingReview(false);
    }
  };

  return (
    <div className="review-list">
      <ReviewButton onClick={handleReviewButtonClick} disabled={isCheckingReview} />
      {alreadyReviewedMsg && <p className="review-list__already-msg">{alreadyReviewedMsg}</p>}
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
