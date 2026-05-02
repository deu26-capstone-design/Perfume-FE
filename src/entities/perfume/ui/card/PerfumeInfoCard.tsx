import './PerfumeInfoCard.css';

interface PerfumeInfoCardProps {
  brand: string;
  name: string;
  imageUrl: string;
  align?: 'left' | 'center';
  direction?: 'row' | 'column';
}

const PerfumeInfoCard: React.FC<PerfumeInfoCardProps> = ({
  brand,
  name,
  imageUrl,
  align = 'left',
  direction = 'row',
}) => {
  return (
    <div className={`perfume-info-card ${align} ${direction}`}>
      {imageUrl && <img src={imageUrl} alt={name} className="perfume-image" />}
      <div className="perfume-text">
        <span className="perfume-name">{name}</span>
        <span className="perfume-brand">{brand}</span>
      </div>
    </div>
  );
};

export default PerfumeInfoCard;
