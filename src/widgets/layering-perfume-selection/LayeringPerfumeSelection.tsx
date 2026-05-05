import { SearchInput } from '@features/perfume-search/ui/SearchInput';
import { FilterDropdown } from '@features/perfume-filter/ui/FilterDropdown';
import PerfumeInfoCard from '@entities/perfume/ui/card/PerfumeInfoCard';
import type { Perfume } from '@entities/perfume/model/types';
import './LayeringPerfumeSelection.css';

const categoryOptions = [
  'Aromatic',
  'Citrus',
  'Earthy/Smoky',
  'Floral',
  'Fresh',
  'Fruity',
  'Green',
  'Musky',
  'Gourmand',
  'Spicy',
  'Sweet',
  'Woody',
];

interface LayeringPerfumeSelectionProps {
  selectedPerfume?: Perfume | null;
  onSelectPerfume: (perfume: Perfume) => void;
  selectedCategories: string[];
  onUpdateCategory: (category: string) => void;
  onReset: () => void;
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
}

export const LayeringPerfumeSelection: React.FC<LayeringPerfumeSelectionProps> = ({
  selectedPerfume,
  selectedCategories,
  onUpdateCategory,
  onReset,
  searchKeyword,
  onSearchChange,
}) => {
  const handleResetAll = () => {
    onSearchChange('');
    onReset();
  };

  return (
    <div className={`layering-perfume-selection ${!selectedPerfume ? 'is-empty' : ''}`}>
      <div className="reset-button-container">
        <button type="button" className="reset-button" onClick={handleResetAll}>
          초기화
        </button>
      </div>

      <div className="layering-perfume-selection__controls">
        <div className="layering-perfume-selection__search">
          <SearchInput variant="layering" value={searchKeyword} onChange={onSearchChange} />
        </div>
        <div className="layering-perfume-selection__filter">
          <FilterDropdown
            label="계열"
            options={categoryOptions}
            selectedValues={selectedCategories}
            onSelect={onUpdateCategory}
          />
        </div>
      </div>

      <div className="layering-perfume-selection__content">
        {selectedPerfume ? (
          <div className="selected-info-wrapper">
            <PerfumeInfoCard
              name={selectedPerfume.name}
              brand={selectedPerfume.brand}
              imageUrl={selectedPerfume.imageUrl}
              direction="row"
              align="left"
            />
          </div>
        ) : (
          <div className="layering-perfume-selection__empty">
            <div className="empty-placeholder" />
          </div>
        )}
      </div>
    </div>
  );
};
