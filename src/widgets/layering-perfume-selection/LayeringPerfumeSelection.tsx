import { useState, useMemo } from 'react';
import './LayeringPerfumeSelection.css';
import { SearchInput } from '@features/perfume-search/ui/SearchInput';
import { FilterDropdown } from '@features/perfume-filter/ui/FilterDropdown';
import PerfumeInfoCard from '@entities/perfume/ui/card/PerfumeInfoCard';
import { usePerfumeFilters } from '@features/perfume-filter/model/usePerfumeFilters';
import { mockPerfumes } from '@entities/perfume/model/mockData';

const categoryOptions = [
  'Aromatic',
  'Citrus',
  'Earthy/Smoky',
  'Floral',
  'Fresh',
  'Fruity',
  'Green',
  'Musky',
  'Resinous',
  'Spicy',
  'Sweet',
  'Woody',
];

interface SelectedPerfumeType {
  brand: string;
  name: string;
  imageUrl: string;
}

interface LayeringPerfumeSelectionProps {
  selectedPerfume?: SelectedPerfumeType | null;
  onSelectPerfume: (perfume: SelectedPerfumeType) => void;
}

export const LayeringPerfumeSelection: React.FC<LayeringPerfumeSelectionProps> = ({
  selectedPerfume,
  onSelectPerfume,
}) => {
  const { filters, setSearch, updateCategory } = usePerfumeFilters();
  const [perfumes] = useState<SelectedPerfumeType[]>(mockPerfumes);

  const visiblePerfumes = useMemo(() => {
    const keyword = filters.search.trim().toLowerCase();
    let result = perfumes;

    if (keyword) {
      result = result.filter(
        (p) => p.name.toLowerCase().includes(keyword) || p.brand.toLowerCase().includes(keyword),
      );
    }
    return result;
  }, [perfumes, filters.search]);

  return (
    <div className="layering-perfume-selection">
      <div className="layering-perfume-selection__controls">
        <div className="layering-perfume-selection__search">
          <SearchInput variant="layering" value={filters.search} onChange={setSearch} />
        </div>
        <div className="layering-perfume-selection__filter">
          <FilterDropdown
            label="계열"
            options={categoryOptions}
            selectedValues={filters.categories}
            onSelect={updateCategory}
          />
        </div>
      </div>
      <div className="layering-perfume-selection__content">
        {selectedPerfume ? (
          <PerfumeInfoCard
            brand={selectedPerfume.brand}
            name={selectedPerfume.name}
            imageUrl={selectedPerfume.imageUrl}
            direction="row"
          />
        ) : (
          <div className="layering-perfume-selection__empty">
            {filters.search && visiblePerfumes.length > 0 ? (
              <ul className="search-result-list">
                {visiblePerfumes.map((perfume, idx) => (
                  <li
                    key={idx}
                    className="search-result-item"
                    onClick={() => onSelectPerfume(perfume)}
                  >
                    {perfume.brand} - {perfume.name}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="empty-text">선택된 향수가 없습니다.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
