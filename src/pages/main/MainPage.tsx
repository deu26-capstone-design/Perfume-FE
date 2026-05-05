import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import { SearchInput } from '@features/perfume-search/ui/SearchInput';
import { FilterDropdown } from '@features/perfume-filter/ui/FilterDropdown';
import PerfumeGrid from '@widgets/perfume-grid/ui/PerfumeGrid';
import { mockPerfumes } from '@entities/perfume/model/mockData';
import type { Perfume } from '@entities/perfume/model/types';
import { usePerfumeFilters } from '@features/perfume-filter/model/usePerfumeFilters';
import { useInfiniteScroll } from '@shared/lib/useInfiniteScroll';

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
const genderOptions = ['None', 'Female', 'Male', 'Unisex'];
const sortOptions = ['높은 평점순', '낮은 평점순'];
const getPageSize = () => {
  if (window.innerWidth <= 768) return 12;
  if (window.innerWidth <= 1024) return 20;
  return 30;
};

const MainPage = () => {
  const navigate = useNavigate();
  const { filters, setSearch, updateCategory, removeCategory, updateGender, setSort } =
    usePerfumeFilters();

  const [allFiltered, setAllFiltered] = useState<Perfume[]>(() =>
    [...mockPerfumes].sort((a, b) => b.avgRating - a.avgRating),
  );
  const [pageNum, setPageNum] = useState(0);
  const [pageSize] = useState(getPageSize);

  // 필터 변경 시 전체 필터링 결과 갱신 및 페이지 초기화
  // API 연동 시 axios.get('/perfumes', { params: { pageNum, size: PAGE_SIZE, ...filters } })로 교체
  useEffect(() => {
    let result = [...mockPerfumes];

    const keyword = filters.search.trim().toLowerCase();
    if (keyword) {
      result = result.filter(
        (p) => p.name.toLowerCase().includes(keyword) || p.brand.toLowerCase().includes(keyword),
      );
    }
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.every((c) => p.scent_type?.includes(c)));
    }
    if (filters.gender) {
      const genderMap: Record<string, string> = { Female: 'W', Male: 'M', Unisex: 'U' };
      result = result.filter((p) => p.gender === genderMap[filters.gender]);
    }
    result.sort((a, b) =>
      filters.sort === '낮은 평점순' ? a.avgRating - b.avgRating : b.avgRating - a.avgRating,
    );

    setAllFiltered(result);
    setPageNum(0);
  }, [filters.search, filters.categories, filters.gender, filters.sort]);

  const perfumes = useMemo(
    () => allFiltered.slice(0, (pageNum + 1) * pageSize),
    [allFiltered, pageNum, pageSize],
  );

  const hasMore = perfumes.length < allFiltered.length;

  const handleLoadMore = useCallback(() => {
    setPageNum((prev) => prev + 1);
  }, []);

  const sentinelRef = useInfiniteScroll(handleLoadMore);

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
          {perfumes.length === 0 ? (
            <p className="main-page__empty">해당 조건에 맞는 향수가 없어요!</p>
          ) : (
            <PerfumeGrid
              variant="main"
              perfumes={perfumes}
              selectedCategories={filters.categories}
              onRemoveCategory={removeCategory}
              onSelectPerfume={(perfume) => navigate(`/perfume/${perfume.id}`)}
            />
          )}
        </div>
        {hasMore && <div ref={sentinelRef} />}
      </div>
    </div>
  );
};

export default MainPage;
