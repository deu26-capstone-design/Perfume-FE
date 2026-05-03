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
import { FaUserCircle } from 'react-icons/fa';
import type { Review } from '@entities/review/model/types';
import '../styles/PerfumeReviewList.css';

const SATISFACTION_ICONS = {
  1: <FaRegFaceGrinHearts size={20} color="var(--gray-600)" />,
  2: <FaRegFaceLaughBeam size={20} color="var(--gray-600)" />,
  3: <FaRegFaceSmile size={20} color="var(--gray-600)" />,
  4: <FaRegFaceMeh size={20} color="var(--gray-600)" />,
  5: <FaRegFaceTired size={20} color="var(--gray-600)" />,
};

const LONGEVITY_ICONS = {
  1: <FaRegFaceLaughBeam size={20} color="var(--gray-600)" />,
  2: <FaRegFaceSmile size={20} color="var(--gray-600)" />,
  3: <FaRegFaceMeh size={20} color="var(--gray-600)" />,
};

const SEASON_ICONS = {
  봄: <LuFlower2 size={20} color="var(--gray-600)" />,
  여름: <FaRegSun size={20} color="var(--gray-600)" />,
  가을: <TbLeaf2 size={20} color="var(--gray-600)" />,
  겨울: <TbSnowman size={20} color="var(--gray-600)" />,
};

interface Props {
  review: Review;
}

export default function PerfumeReviewItem({ review }: Props) {
  const {
    nickname,
    profileImageUrl,
    satisfaction,
    longevity,
    seasons,
    scents,
    comment,
    createdAt,
  } = review;
  const date = createdAt.slice(0, 10).replace(/-/g, '.');

  return (
    <div className="review-item">
      <div className="review-item__header">
        <div className="review-item__profile">
          {profileImageUrl ? (
            <img src={profileImageUrl} alt={nickname} className="review-item__profile-img" />
          ) : (
            <FaUserCircle size={36} className="review-item__profile-default" />
          )}
          <span className="review-item__nickname">{nickname}</span>
        </div>
        <span className="review-item__date">{date}</span>
      </div>

      <div className="review-item__ratings">
        <div className="review-item__rating-group">
          <span className="review-item__rating-label">만족도</span>
          {SATISFACTION_ICONS[satisfaction]}
        </div>

        {longevity !== null && (
          <div className="review-item__rating-group">
            <span className="review-item__rating-label">지속력</span>
            {LONGEVITY_ICONS[longevity]}
          </div>
        )}

        {seasons && seasons.length > 0 && (
          <div className="review-item__rating-group">
            <span className="review-item__rating-label">계절</span>
            {seasons.map((season) => (
              <span key={season}>{SEASON_ICONS[season]}</span>
            ))}
          </div>
        )}
      </div>

      {scents && scents.length > 0 && (
        <div className="review-item__scents">
          {scents.map((scent) => (
            <span key={scent} className="review-item__scent">
              #{scent}
            </span>
          ))}
        </div>
      )}

      {comment && <p className="review-item__comment">{comment}</p>}
    </div>
  );
}
