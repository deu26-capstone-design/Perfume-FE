import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { postReview } from '@entities/perfume/api/perfumeApi';
import { patchReview } from '@entities/review/api/reviewApi';

export interface EditReviewData {
  reviewId: number;
  satisfaction: 1 | 2 | 3 | 4 | 5;
  longevity: 1 | 2 | 3 | null;
  seasons: ('봄' | '여름' | '가을' | '겨울')[];
  scents: string[];
  comment: string;
}

interface UseReviewFormProps {
  perfumeId: number;
  editData?: EditReviewData;
  onClose: () => void;
  onSubmit: () => void;
}

export function useReviewForm({ perfumeId, editData, onClose, onSubmit }: UseReviewFormProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [satisfaction, setSatisfaction] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [longevity, setLongevity] = useState<1 | 2 | 3 | null>(null);
  const [seasons, setSeasons] = useState<('봄' | '여름' | '가을' | '겨울')[]>([]);
  const [scents, setScents] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (editData) {
      setSatisfaction(editData.satisfaction);
      setLongevity(editData.longevity);
      setSeasons(editData.seasons || []);
      setScents(editData.scents || []);
      setComment(editData.comment || '');
      setIsAgreed(true);
    }
  }, [editData]);

  const toggleSeason = (season: '봄' | '여름' | '가을' | '겨울') => {
    setSeasons((prev) =>
      prev.includes(season) ? prev.filter((s) => s !== season) : [...prev, season],
    );
  };

  const toggleScent = (scent: string) => {
    setScents((prev) => {
      if (prev.includes(scent)) return prev.filter((s) => s !== scent);
      if (prev.length >= 5) return prev;
      return [...prev, scent];
    });
  };

  const handleSubmit = async () => {
    if (!satisfaction || !isAgreed || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      satisfaction,
      longevity,
      seasons: seasons.length > 0 ? seasons : null,
      scents: scents.length > 0 ? scents : null,
      comment: comment.trim() || null,
      disclaimerAgreed: true as const,
    };

    try {
      if (editData) {
        // await patchReview(editData.reviewId, payload);
      } else {
        await postReview(perfumeId, payload);
      }
      onSubmit();
      onClose();
    } catch (err: unknown) {
      const status = (err as { response?: { status: number } })?.response?.status;
      if (status === 409) setErrorMessage('이미 작성한 리뷰가 있습니다.');
      else if (status === 401) navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      else setErrorMessage('리뷰 제출에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    state: {
      satisfaction,
      longevity,
      seasons,
      scents,
      comment,
      isAgreed,
      isSubmitting,
      errorMessage,
    },
    actions: {
      setSatisfaction,
      setLongevity,
      setComment,
      setIsAgreed,
      toggleSeason,
      toggleScent,
      handleSubmit,
    },
  };
}
