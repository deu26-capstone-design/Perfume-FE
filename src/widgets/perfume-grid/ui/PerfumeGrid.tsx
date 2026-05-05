import { PerfumeCard } from '@entities/perfume/ui/card/PerfumeCard';
import type { Perfume } from '@entities/perfume/model/types';
import { FilterTag } from '@shared/ui/filter-tag/FilterTag';
import './PerfumeGrid.css';

interface PerfumeGridProps {
  perfumes: Perfume[];
  selectedCategories: string[];
  onRemoveCategory: (category: string) => void;
  onSelectPerfume?: (perfume: Perfume) => void;
  variant?: 'layering' | 'main';
}

const PerfumeGrid = ({
  perfumes,
  selectedCategories,
  onRemoveCategory,
  onSelectPerfume,
  variant = 'main',
}: PerfumeGridProps) => {
  return (
    <section className={`perfume-grid-container ${variant}`}>
      {/* 선택된 계열 태그 */}
      {selectedCategories.length > 0 && (
        <div className="filter-tag-area">
          {selectedCategories.map((category) => (
            <FilterTag
              key={category}
              label={category}
              onRemove={() => onRemoveCategory(category)}
            />
          ))}
        </div>
      )}

      {/* 향수 카드 리스트 */}
      <div className="perfume-grid-list">
        {perfumes.map((perfume) => (
          <div
            key={perfume.id}
            className={`perfume-card-wrapper ${onSelectPerfume ? 'clickable' : ''}`}
            onClick={() => onSelectPerfume?.(perfume)}
          >
            <PerfumeCard perfume={perfume} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PerfumeGrid;
