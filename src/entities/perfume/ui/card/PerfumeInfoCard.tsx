import './PerfumeInfoCard.css';

interface PerfumeInfoCardProps {
  brand: string;
  name: string;
  imageUrl: string | null;
  align?: 'left' | 'center';
  direction?: 'row' | 'column';
  onClick?: () => void;
}

const PerfumeInfoCard: React.FC<PerfumeInfoCardProps> = ({
  name,
  brand,
  imageUrl,
  align = 'left',
  direction = 'row',
  onClick,
}) => {
  return (
    <div
      className={`perfume-info-card ${align} ${direction} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {imageUrl && <img src={imageUrl} alt={name} className="perfume-image" />}

      <div className="perfume-text">
        <span className="perfume-name">{name}</span>
        <span className="perfume-brand">{brand}</span>
      </div>
    </div>
  );
};

export default PerfumeInfoCard;
