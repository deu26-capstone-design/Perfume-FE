import { FaFaceGrinHearts } from 'react-icons/fa6';
import { FaFaceLaughBeam } from 'react-icons/fa6';
import { FaFaceGrin } from 'react-icons/fa6';
import { FaFaceFrown } from 'react-icons/fa6';
import { FaFaceAngry } from 'react-icons/fa6';
import { LuFlower2 } from 'react-icons/lu';
import { FaRegSun } from 'react-icons/fa6';
import { FaCanadianMapleLeaf } from 'react-icons/fa';
import { FaSnowman } from 'react-icons/fa';
import '../styles/PerfumeReview.css';

export default function PerfumeReview() {
  return (
    <div className="perfume-review">
      <hr />
      <div className="perfume-review__sections">
        <div className="perfume-review__satisfaction">
          <span className="perfume-review__section-title">
            이 향수에 대한 유저들의 만족도는 다음과 같아요!
          </span>
          <div className="perfume-review__satisfaction-group">
            <div className="perfume-review__satisfaction-item">
              <FaFaceGrinHearts size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">매우좋음</span>
              <span className="perfume-review__item-value">{/* 유저들의 만족도 수치 */}</span>
            </div>

            <div className="perfume-review__satisfaction-item">
              <FaFaceLaughBeam size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">좋음</span>
              <span className="perfume-review__item-value">{/* 유저들의 만족도 수치 */}</span>
            </div>

            <div className="perfume-review__satisfaction-item">
              <FaFaceGrin size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">보통</span>
              <span className="perfume-review__item-value">11</span>
            </div>

            <div className="perfume-review__satisfaction-item">
              <FaFaceFrown size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">나쁨</span>
              <span className="perfume-review__item-value">{/* 유저들의 만족도 수치 */}</span>
            </div>

            <div className="perfume-review__satisfaction-item">
              <FaFaceAngry size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">매우나쁨</span>
              <span className="perfume-review__item-value">{/* 유저들의 만족도 수치 */}</span>
            </div>
          </div>
        </div>

        <div className="perfume-review__season">
          <span className="perfume-review__section-title">
            유저들은 이 향수를 이런 계절에 사용해요!
          </span>
          <div className="perfume-review__season-group">
            <div className="perfume-review__season-item">
              <LuFlower2 size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">봄</span>
              <span className="perfume-review__item-value">30%</span>
            </div>

            <div className="perfume-review__season-item">
              <FaRegSun size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">여름</span>
              <span className="perfume-review__item-value">{/* 유저들의 만족도 수치 */}</span>
            </div>

            <div className="perfume-review__season-item">
              <FaCanadianMapleLeaf size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">가을</span>
              <span className="perfume-review__item-value">{/* 유저들의 만족도 수치 */}</span>
            </div>

            <div className="perfume-review__season-item">
              <FaSnowman size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">겨울</span>
              <span className="perfume-review__item-value">{/* 유저들의 만족도 수치 */}</span>
            </div>
          </div>
        </div>

        <div className="perfume-review__longevity">
          <span className="perfume-review__section-title">
            유저들이 평가한 향수의 지속력은 다음과 같아요!
          </span>
          <div className="perfume-review__longevity-group">
            <div className="perfume-review__longevity-item">
              <FaFaceLaughBeam size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">매우좋음</span>
              <span className="perfume-review__item-value">{/* 유저들의 만족도 수치 */}</span>
            </div>

            <div className="perfume-review__longevity-item">
              <FaFaceGrin size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">좋음</span>
              <span className="perfume-review__item-value">{/* 유저들의 만족도 수치 */}</span>
            </div>

            <div className="perfume-review__longevity-item">
              <FaFaceFrown size={35} color="var(--detail-review-context)" />
              <span className="perfume-review__item-title">보통</span>
              <span className="perfume-review__item-value">{/* 유저들의 만족도 수치 */}</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
