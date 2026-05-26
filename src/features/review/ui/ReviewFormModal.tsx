import { useEffect } from 'react';
import { useReviewForm, type EditReviewData } from '../hooks/useReviewForm';
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
  editData?: EditReviewData;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ReviewFormModal({ perfumeId, editData, onClose, onSubmit }: Props) {
  const { state, actions } = useReviewForm({ perfumeId, editData, onClose, onSubmit });

  const {
    satisfaction,
    longevity,
    seasons,
    scents,
    comment,
    isAgreed,
    isSubmitting,
    errorMessage,
  } = state;
  const {
    setSatisfaction,
    setLongevity,
    setComment,
    setIsAgreed,
    toggleSeason,
    toggleScent,
    handleSubmit,
  } = actions;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isSubmitting]);

  return (
    <div className="modal-overlay" onClick={isSubmitting ? undefined : onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="review-form-title" className="modal__title">
            {editData ? '리뷰 수정하기' : '리뷰 작성하기'}
          </h2>
          <button
            type="button"
            className="modal__close"
            aria-label={editData ? '리뷰 수정 모달 닫기' : '리뷰 작성 모달 닫기'}
            onClick={onClose}
            disabled={isSubmitting}
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
            <p
              style={{ color: 'var(--error, #e53e3e)', fontSize: '0.9rem', marginBottom: '0.5rem' }}
            >
              {errorMessage}
            </p>
          )}
          <button
            type="button"
            className="modal__submit"
            onClick={handleSubmit}
            disabled={!satisfaction || !isAgreed || isSubmitting}
          >
            {isSubmitting ? '제출 중...' : editData ? '수정완료' : '제출하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
