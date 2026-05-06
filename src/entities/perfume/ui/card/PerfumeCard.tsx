import './PerfumeCard.css';
import type { Perfume } from '../../model/types';

interface PerfumeCardProps {
  perfume: Perfume;
}

export const PerfumeCard = ({ perfume }: PerfumeCardProps) => (
  <article className="perfume-card">
    <div className="perfume-card__inner">
      <div className="perfume-card__image-container">
        <img src={perfume.imageUrl} alt={perfume.name} className="perfume-card__image" />
      </div>
      <div className="perfume-card__info">
        <h3 className="perfume-card__name">{perfume.name}</h3>
        <p className="perfume-card__brand">{perfume.brand}</p>
      </div>
    </div>
  </article>
);
