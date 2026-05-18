import PerfumeInfoCard from '@entities/perfume/ui/card/PerfumeInfoCard';
import './SimplePerfumeGrid.css';

export interface GridPerfumeItem {
  id: number;
  name: string;
  brand: string;
  imageUrl: string | null;
}

interface SimplePerfumeGridProps {
  perfumes: GridPerfumeItem[];
  onSelectPerfume?: (perfume: GridPerfumeItem) => void;
}

const SimplePerfumeGrid = ({ perfumes, onSelectPerfume }: SimplePerfumeGridProps) => {
  return (
    <div className="perfume-grid">
      {perfumes.map((perfume) => (
        <PerfumeInfoCard
          key={perfume.id}
          name={perfume.name}
          brand={perfume.brand}
          imageUrl={perfume.imageUrl || ''}
          direction="column"
          align="center"
          onClick={onSelectPerfume ? () => onSelectPerfume(perfume) : undefined}
        />
      ))}
    </div>
  );
};

export default SimplePerfumeGrid;
