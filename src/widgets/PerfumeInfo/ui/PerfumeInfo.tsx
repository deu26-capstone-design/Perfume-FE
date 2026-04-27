// src/features/perfume/ui/PerfumeInfo.tsx
import '../styles/PerfumeInfo.css';
import WishlistButton from '@features/wishlist/ui/WishlistButton';
import type { PerfumeDetail } from '@entities/perfume/model/detailTypes';

interface Props {
  perfume: PerfumeDetail;
}

export default function PerfumeInfo({ perfume }: Props) {
  return (
    <div className="perfume-info">
      <img className="perfume-info__image" src={perfume.imageUrl} alt={perfume.name} />

      <div className="perfume-info__content">
        <h1 className="perfume-info__name">{perfume.name}</h1>
        <p className="perfume-info__brand">{perfume.brand}</p>
        <p className="perfume-info__gender">{perfume.gender}</p>

        <div className="perfume-info__notes">
          <div className="perfume-info__notes-group">
            <span className="perfume-info__notes-label">Top</span>
            <span className="perfume-info__notes-value">{perfume.notes.top.join(', ')}</span>
          </div>
          <div className="perfume-info__notes-group">
            <span className="perfume-info__notes-label">Middle</span>
            <span className="perfume-info__notes-value">{perfume.notes.mid.join(', ')}</span>
          </div>
          <div className="perfume-info__notes-group">
            <span className="perfume-info__notes-label">Base</span>
            <span className="perfume-info__notes-value">{perfume.notes.base.join(', ')}</span>
          </div>
        </div>

        <div className="perfume-info__graph">
          {perfume.accords.map((accord) => (
            <div key={accord.name} className="perfume-info__accord">
              <span className="perfume-info__accord-name">{accord.name}</span>
              <div className="perfume-info__accord-bar-wrap">
                <div className="perfume-info__accord-bar" style={{ width: `${accord.ratio}%` }} />
              </div>
              <span className="perfume-info__accord-ratio">{accord.ratio}%</span>
            </div>
          ))}
        </div>

        <p className="perfume-info__description">{perfume.description}</p>

        <WishlistButton perfumeId={perfume.id} />
      </div>
    </div>
  );
}
1;
