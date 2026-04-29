import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { SearchInput } from '@features/perfume-search/ui/SearchInput';
import { FilterDropdown } from '@features/perfume-filter/ui/FilterDropdown';
import PerfumeGrid from '@widgets/perfume-grid/ui/PerfumeGrid';
import { mockPerfumes } from '@entities/perfume/model/mockData';
import type { Perfume } from '@entities/perfume/model/types';

/* 계열 필터 옵션 */
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

/* 성별 필터 옵션 */
const genderOptions = ['None', 'Male', 'Female', 'Unisex'];

/* 정렬 옵션 */
const sortOptions = ['낮은 평점순', '높은 평점순'];

const MainPage = () => {
  /* 검색어 상태 */
  const [searchValue, setSearchValue] = useState('');

  /* 선택된 계열 필터 상태 */
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  /* 향수 데이터 상태 */
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);

  useEffect(() => {
    setPerfumes(mockPerfumes);
  }, []);

  /* 계열 필터 선택 및 해제 */
  const handleCategorySelect = (category: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((item) => item !== category) // 이미 선택된 계열이면 제거
          : [...prev, category], // 선택되지 않은 계열이면 추가
    );
  };

  /* 선택된 계열 태그 삭제 */
  const handleRemoveCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((item) => item !== category));
  };

  /* 성별 필터 선택 */
  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender === 'None' ? '' : gender);
  };

  /* 드롭다운에 표시할 계열 텍스트 */
  const selectedCategoryLabel = selectedCategories.length > 0 ? selectedCategories.join(', ') : '';

  return (
    <div className="main-page">
      <div className="main-page__content">
        {/* 검색창 */}
        <div className="main-page__block main-page__block--main">
          <SearchInput variant="main" value={searchValue} onChange={setSearchValue} />
        </div>

        {/* 필터 영역 */}
        <div className="main-page__dropdown-group">
          {/* 왼쪽 필터 그룹: 계열, 성별 */}
          <div className="main-page__dropdown-group-left">
            <FilterDropdown
              label="계열"
              options={categoryOptions}
              value={selectedCategoryLabel}
              onSelect={handleCategorySelect}
            />

            <FilterDropdown
              label="성별"
              options={genderOptions}
              value={selectedGender}
              onSelect={handleGenderSelect}
            />
          </div>

          {/* 오른쪽 필터 그룹: 정렬 */}
          <div className="main-page__dropdown-group-right">
            <FilterDropdown
              label="평점순"
              options={sortOptions}
              value={sortOrder}
              onSelect={setSortOrder}
            />
          </div>
        </div>

        {/* 향수 리스트 */}
        <div className="main-page__grid">
          <PerfumeGrid
            variant="main"
            perfumes={perfumes}
            selectedCategories={selectedCategories}
            onRemoveCategory={handleRemoveCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
