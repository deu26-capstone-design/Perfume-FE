import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaRegFaceGrinHearts,
  FaRegFaceLaughBeam,
  FaRegFaceSmile,
  FaRegFaceMeh,
  FaRegFaceTired,
} from 'react-icons/fa6';
import { LuFlower2 } from 'react-icons/lu';
import { FaRegSun } from 'react-icons/fa';
import { TbLeaf2, TbSnowman } from 'react-icons/tb';
import { postReview } from '@entities/perfume/api/perfumeApi';
import '../styles/ReviewFormModal.css';

const SATISFACTION_OPTIONS = [
  { value: 5 as const, icon: <FaRegFaceGrinHearts size={28} />, label: '매우좋음' },
  { value: 4 as const, icon: <FaRegFaceLaughBeam size={28} />, label: '좋음' },
  { value: 3 as const, icon: <FaRegFaceSmile size={28} />, label: '보통' },
  { value: 2 as const, icon: <FaRegFaceMeh size={28} />, label: '나쁨' },
  { value: 1 as const, icon: <FaRegFaceTired size={28} />, label: '매우나쁨' },
];

const LONGEVITY_OPTIONS = [
  { value: 3 as const, icon: <FaRegFaceLaughBeam size={28} />, label: '길어요' },
  { value: 2 as const, icon: <FaRegFaceSmile size={28} />, label: '적당해요' },
  { value: 1 as const, icon: <FaRegFaceMeh size={28} />, label: '짧아요' },
];

const SEASON_OPTIONS = [
  { value: '봄' as const, icon: <LuFlower2 size={24} /> },
  { value: '여름' as const, icon: <FaRegSun size={24} /> },
  { value: '가을' as const, icon: <TbLeaf2 size={24} /> },
  { value: '겨울' as const, icon: <TbSnowman size={24} /> },
];

const SCENT_OPTIONS = [
  '꽃 향',
  '나무 향',
  '청량한 향',
  '스파이시한 향',
  '달콤한 향',
  '디저트 향',
  '포근한 향',
  '풀 향',
  '상큼한 향',
  '과일 향',
  '허브 향',
  '흙내음',
];

interface Props {
  perfumeId: number;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ReviewFormModal({ perfumeId, onClose, onSubmit }: Props) {
  const navigate = useNavigate();
  const [satisfaction, setSatisfaction] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [longevity, setLongevity] = useState<1 | 2 | 3 | null>(null);
  const [seasons, setSeasons] = useState<('봄' | '여름' | '가을' | '겨울')[]>([]);
  const [scents, setScents] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
    try {
      await postReview(perfumeId, {
        satisfaction,
        longevity,
        seasons: seasons.length > 0 ? seasons : null,
        scents: scents.length > 0 ? scents : null,
        comment: comment.trim() || null,
        disclaimerAgreed: true,
      });
      onSubmit();
    } catch (err: unknown) {
      const status = (err as { response?: { status: number } })?.response?.status;
      if (status === 409) setErrorMessage('이미 작성한 리뷰가 있습니다.');
      else if (status === 401) navigate('/login');
      else setErrorMessage('리뷰 제출에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="review-form-title" className="modal__title">
            리뷰 작성하기
          </h2>
          <button
            type="button"
            className="modal__close"
            aria-label="리뷰 작성 모달 닫기"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="modal__body">
          <div className="modal__section">
            <span className="modal__label">
              향수에 대한 만족도는 어떠신가요? <span className="modal__required">*</span>
            </span>
            <div className="modal__emoji-group">
              {SATISFACTION_OPTIONS.map(({ value, icon, label }) => (
                <button
                  key={value}
                  type="button"
                  className={`modal__emoji-btn ${satisfaction === value ? 'selected' : ''}`}
                  onClick={() => setSatisfaction(value)}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="modal__section">
            <span className="modal__label">이 향수의 지속력은 어땠나요? (선택)</span>
            <div className="modal__emoji-group">
              {LONGEVITY_OPTIONS.map(({ value, icon, label }) => (
                <button
                  key={value}
                  type="button"
                  className={`modal__emoji-btn ${longevity === value ? 'selected' : ''}`}
                  onClick={() => setLongevity((prev) => (prev === value ? null : value))}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="modal__section">
            <span className="modal__label">
              이 향수는 어떤 계절에 사용하는 걸 추천하시나요? (중복 가능)
            </span>
            <div className="modal__emoji-group">
              {SEASON_OPTIONS.map(({ value, icon }) => (
                <button
                  key={value}
                  type="button"
                  className={`modal__emoji-btn ${seasons.includes(value) ? 'selected' : ''}`}
                  onClick={() => toggleSeason(value)}
                >
                  {icon}
                  <span>{value}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="modal__section">
            <span className="modal__label">이런 향이 좋았어요! (최대 5개)</span>
            <div className="modal__scent-group">
              {SCENT_OPTIONS.map((scent) => (
                <button
                  key={scent}
                  type="button"
                  className={`modal__scent-btn ${scents.includes(scent) ? 'selected' : ''}`}
                  onClick={() => toggleScent(scent)}
                  disabled={!scents.includes(scent) && scents.length >= 5}
                >
                  #{scent}
                </button>
              ))}
            </div>
          </div>

          <div className="modal__section">
            <span className="modal__label">
              이 향수에 대해 남기고 싶은 말이 있다면 작성해주세요! (선택)
            </span>
            <textarea
              className="modal__textarea"
              placeholder="1000자 이내로 작성해주세요."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
            />
            <span className="modal__char-count">{comment.length} / 1000</span>
          </div>

          <label className="modal__agreement">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
            />
            <span>본 리뷰는 광고성 수익과 무관하며, 순수한 개인 의견임을 확인합니다.</span>
          </label>
        </div>

        <div className="modal__footer">
          {errorMessage && (
            <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {errorMessage}
            </p>
          )}
          <button
            type="button"
            className="modal__submit"
            onClick={handleSubmit}
            disabled={!satisfaction || !isAgreed || isSubmitting}
          >
            {isSubmitting ? '제출 중...' : '제출하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
