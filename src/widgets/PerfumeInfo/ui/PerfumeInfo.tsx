// src/features/perfume/ui/PerfumeInfo.tsx
import '../styles/PerfumeInfo.css';
import WishlistButton from '@features/wishlist/ui/WishlistButton';
import type { PerfumeDetail } from '@entities/perfume/model/detailTypes';

interface Props {
  perfume: PerfumeDetail;
}

const accordColors: Record<string, string> = {
  Floral: '#F4C0D1',
  Woody: '#C9A882',
  Fresh: '#85B7EB',
  Spicy: '#C0392B',
  Sweet: '#FAC775',
  Musky: '#7F77DD',
  Green: '#5DCAA5',
  Resinous: '#AFA9EC',
  Citrus: '#EF9F27',
  Fruity: '#ED93B1',
  Aromatic: '#9FE1CB',
  'Earthy/Smoky': '#6B4F3A',
};

export default function PerfumeInfo({ perfume }: Props) {
  const genderClass = `perfume-info__gender--${perfume.gender.toLowerCase()}`;

  return (
    <div className="perfume-info">
      <img className="perfume-info__img" src={perfume.imageUrl} alt={perfume.name} />

      <div className="perfume-info__content">
        <div className="perfume-info__content info">
          <h1 className="perfume-info__brand">{perfume.brand}</h1>
          <h2 className="perfume-info__name">{perfume.name}</h2>
          <div className={`perfume-info__gender ${genderClass}`}>{perfume.gender}</div>
          <hr />
        </div>

        <div className="perfume-info__detail">
          <div className="perfume-info__notes">
            노트 구성
            {(['top', 'mid', 'base'] as const).map((tier) => (
              <div key={tier} className="perfume-info__notes-group">
                <span className="perfume-info__notes-label">
                  {tier === 'mid' ? 'Middle' : tier.charAt(0).toUpperCase() + tier.slice(1)}
                </span>
                <div className="perfume-info__notes-values">
                  {perfume.notes[tier].map((note) => (
                    <span key={note} className="perfume-info__notes-value">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="perfume-info__graph">
            향 계열 비율
            {[...perfume.accords].sort((a, b) => b.ratio - a.ratio).map((accord) => (
              <div key={accord.name} className="perfume-info__accord">
                <span className="perfume-info__accord-name">{accord.name}</span>
                <div className="perfume-info__accord-bar-wrap">
                  <div
                    className="perfume-info__accord-bar"
                    style={{
                      width: `${accord.ratio}%`,
                      backgroundColor: accordColors[accord.name],
                    }}
                  >
                    {accord.ratio}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="perfume-info__description">
          <span>상세 설명</span>
          <p>{perfume.description}</p>
        </div>
        <WishlistButton perfumeId={perfume.id} />
      </div>
    </div>
  );
}
