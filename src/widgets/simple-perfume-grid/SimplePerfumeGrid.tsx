import PerfumeInfoCard from '@entities/perfume/ui/card/PerfumeInfoCard';
import { mockPerfumes } from '@entities/perfume/model/mockData';
import type { Accord } from '@entities/accords/model/accordsType';
import './SimplePerfumeGrid.css';

type PerfumeItem = Accord['perfumes'][number];

interface SimplePerfumeGridProps {
  perfumes?: Accord['perfumes'];
  onSelectPerfume?: (perfume: PerfumeItem) => void;
}

const SimplePerfumeGrid = ({ perfumes, onSelectPerfume }: SimplePerfumeGridProps) => {
  const displayPerfumes =
    perfumes && perfumes.length > 0 ? perfumes : (mockPerfumes as PerfumeItem[]);
  return (
    <div className="perfume-grid">
      {displayPerfumes.map((perfume) => (
        <PerfumeInfoCard
          key={perfume.id}
          name={perfume.name}
          brand={perfume.brand}
          imageUrl={perfume.imageUrl}
          direction="column"
          align="center"
          onClick={onSelectPerfume ? () => onSelectPerfume(perfume) : undefined}
        />
      ))}
    </div>
  );
};

export default SimplePerfumeGrid;
