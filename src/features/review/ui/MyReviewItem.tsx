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
import PerfumeInfoCard from '@entities/perfume/ui/card/PerfumeInfoCard';
import type { Review } from '@entities/review/model/types';
import '../styles/MyReviewItem.css';

export interface MyReviewType extends Omit<
  Review,
  'nickname' | 'profileImageUrl' | 'seasons' | 'scents' | 'satisfaction' | 'longevity'
> {
  id: number;
  perfumeName: string;
  brandName: string;
  imageUrl: string;
  satisfaction: number;
  longevity: number | null;
  readonly seasons: readonly string[];
  readonly scents: readonly string[];
}

const SATISFACTION_ICONS = {
  5: <FaRegFaceGrinHearts size={20} color="var(--gray-600)" />,
  4: <FaRegFaceLaughBeam size={20} color="var(--gray-600)" />,
  3: <FaRegFaceSmile size={20} color="var(--gray-600)" />,
  2: <FaRegFaceMeh size={20} color="var(--gray-600)" />,
  1: <FaRegFaceTired size={20} color="var(--gray-600)" />,
};

const LONGEVITY_ICONS = {
  3: <FaRegFaceLaughBeam size={20} color="var(--gray-600)" />,
  2: <FaRegFaceSmile size={20} color="var(--gray-600)" />,
  1: <FaRegFaceMeh size={20} color="var(--gray-600)" />,
};

const SEASON_ICONS = {
  봄: <LuFlower2 size={20} color="var(--gray-600)" />,
  여름: <FaRegSun size={20} color="var(--gray-600)" />,
  가을: <TbLeaf2 size={20} color="var(--gray-600)" />,
  겨울: <TbSnowman size={20} color="var(--gray-600)" />,
};

interface MyReviewProps {
  review: MyReviewType;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function MyReviewItem({ review, onEdit, onDelete }: MyReviewProps) {
  const {
    id,
    satisfaction,
    longevity,
    seasons,
    scents,
    comment,
    createdAt,
    perfumeName,
    brandName,
    imageUrl,
  } = review;

  const d = new Date(createdAt);
  const date = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

  return (
    <div className="my-review-item">
      <div className="my-review-item__perfume">
        <PerfumeInfoCard
          brand={brandName}
          name={perfumeName}
          imageUrl={imageUrl}
          align="center"
          direction="column"
        />
      </div>

      <div className="my-review-item__content">
        <div className="my-review-item__header">
          <span className="review-item__date">{date}</span>
          <div className="my-review-item__actions">
            <button onClick={() => onEdit(id)} className="my-review-btn">
              수정
            </button>
            <button onClick={() => onDelete(id)} className="my-review-btn">
              삭제
            </button>
          </div>
        </div>

        <div className="review-item__ratings">
          <div className="review-item__rating-group">
            <span className="review-item__rating-label">만족도</span>
            {SATISFACTION_ICONS[satisfaction as keyof typeof SATISFACTION_ICONS]}
          </div>
          {longevity !== null && (
            <div className="review-item__rating-group">
              <span className="review-item__rating-label">지속력</span>
              {LONGEVITY_ICONS[longevity as keyof typeof LONGEVITY_ICONS]}
            </div>
          )}
          <div className="review-item__rating-group">
            <span className="review-item__rating-label">계절성</span>
            {seasons?.map((s) => (
              <span key={s}>{SEASON_ICONS[s as keyof typeof SEASON_ICONS]}</span>
            ))}
          </div>
        </div>

        <div className="review-item__scents">
          {scents?.map((scent) => (
            <span key={scent} className="review-item__scent">
              #{scent}
            </span>
          ))}
        </div>

        <p className="review-item__comment">{comment}</p>
      </div>
    </div>
  );
}
