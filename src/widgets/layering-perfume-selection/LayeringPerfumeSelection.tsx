import { useState, useEffect } from 'react';
import { SearchInput } from '@features/perfume-search/ui/SearchInput';
import { FilterDropdown } from '@features/perfume-filter/ui/FilterDropdown';
import PerfumeInfoCard from '@entities/perfume/ui/card/PerfumeInfoCard';
import type { Perfume } from '@entities/perfume/model/types';
import { getAccords } from '@entities/perfume/api/perfumeApi';
import './LayeringPerfumeSelection.css';

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
  const [accordOptions, setAccordOptions] = useState<string[]>([]);

  // accord 목록 조회
  useEffect(() => {
    let isMounted = true;

    const fetchAccords = async () => {
      try {
        const response = await getAccords();

        if (!isMounted) return;

        setAccordOptions(response.data);
      } catch (error) {
        console.error('계열 목록 조회 실패', error);
      }
    };
    fetchAccords();

    return () => {
      isMounted = false;
    };
  }, []);

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
            options={accordOptions}
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
