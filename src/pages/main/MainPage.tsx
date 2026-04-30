import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { SearchInput } from '@features/perfume-search/ui/SearchInput';
import { FilterDropdown } from '@features/perfume-filter/ui/FilterDropdown';
import PerfumeGrid from '@widgets/perfume-grid/ui/PerfumeGrid';
import { mockPerfumes } from '@entities/perfume/model/mockData';
import type { Perfume } from '@entities/perfume/model/types';
import { usePerfumeFilters } from '@features/perfume-filter/model/usePerfumeFilters';

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
const genderOptions = ['None', 'Male', 'Female', 'Unisex'];
const sortOptions = ['낮은 평점순', '높은 평점순'];

const MainPage = () => {
  /* 커스텀 훅 사용 */
  const { filters, setSearch, updateCategory, removeCategory, updateGender, setSort } =
    usePerfumeFilters();

  /* 향수 데이터 상태 */
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);

  useEffect(() => {
    setPerfumes(mockPerfumes);
  }, []);

  return (
    <div className="main-page">
      <div className="main-page__content">
        {/* 검색창 */}
        <div className="main-page__block main-page__block--main">
          <SearchInput variant="main" value={filters.search} onChange={setSearch} />
        </div>

        {/* 필터 영역 */}
        <div className="main-page__dropdown-group">
          <div className="main-page__dropdown-group-left">
            <FilterDropdown
              label="계열"
              options={categoryOptions}
              selectedValues={filters.categories}
              onSelect={updateCategory}
            />

            <FilterDropdown
              label="성별"
              options={genderOptions}
              selectedValues={filters.gender}
              onSelect={updateGender}
            />
          </div>

          <div className="main-page__dropdown-group-right">
            <FilterDropdown
              label="높은 평점순"
              options={sortOptions}
              selectedValues={filters.sort}
              onSelect={setSort}
            />
          </div>
        </div>

        {/* 향수 리스트 */}
        <div className="main-page__grid">
          <PerfumeGrid
            variant="main"
            perfumes={perfumes}
            selectedCategories={filters.categories}
            onRemoveCategory={removeCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
