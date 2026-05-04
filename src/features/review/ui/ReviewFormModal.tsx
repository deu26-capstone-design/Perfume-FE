import { useState } from 'react';
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
import type { Review } from '@entities/review/model/types';
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
  '시트러스 향',
  '과일 향',
  '허브 향',
  '흙내음',
];

interface Props {
  onClose: () => void;
  onSubmit: (review: Review) => void;
}

export default function ReviewFormModal({ onClose, onSubmit }: Props) {
  const [satisfaction, setSatisfaction] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [longevity, setLongevity] = useState<1 | 2 | 3 | null>(null);
  const [seasons, setSeasons] = useState<('봄' | '여름' | '가을' | '겨울')[]>([]);
  const [scents, setScents] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

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

  const handleSubmit = () => {
    if (!satisfaction) return;
    onSubmit({
      nickname: 'user', // 추후 로그인 유저 정보로 교체
      profileImageUrl: null,
      satisfaction,
      longevity,
      seasons: seasons.length > 0 ? seasons : null,
      scents: scents.length > 0 ? scents : null,
      comment: comment.trim() || null,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">리뷰 작성하기</h2>
          <button className="modal__close" onClick={onClose}>
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
          <button
            type="button"
            className="modal__submit"
            onClick={handleSubmit}
            disabled={!satisfaction || !isAgreed}
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}
