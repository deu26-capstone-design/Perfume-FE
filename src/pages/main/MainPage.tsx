import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import { SearchInput } from '@features/perfume-search/ui/SearchInput';
import { FilterDropdown } from '@features/perfume-filter/ui/FilterDropdown';
import PerfumeGrid from '@widgets/perfume-grid/ui/PerfumeGrid';
import type { Perfume } from '@entities/perfume/model/types';
import { usePerfumeFilters } from '@features/perfume-filter/model/usePerfumeFilters';
import { useInfiniteScroll } from '@shared/lib/useInfiniteScroll';
import { useDebounce } from '@shared/lib/useDebounce';
import {
  getPerfumes,
  getAccords,
  type PerfumeListResponse,
} from '@entities/perfume/api/perfumeApi';

const genderOptions = ['None', 'Female', 'Male', 'Unisex'];
const sortOptions = ['높은 평점순', '낮은 평점순'];

const GENDER_MAP: Record<string, Perfume['gender']> = { Female: 'W', Male: 'M', Unisex: 'U' };
const SORT_MAP: Record<string, 'rating_asc' | 'rating_desc'> = {
  '높은 평점순': 'rating_desc',
  '낮은 평점순': 'rating_asc',
};

const getPageSize = () => {
  if (window.innerWidth <= 768) return 12;
  if (window.innerWidth <= 1024) return 20;
  return 30;
};

const MainPage = () => {
  const navigate = useNavigate();
  const { filters, setSearch, updateAccord, removeAccord, updateGender, setSort } =
    usePerfumeFilters();

  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [accordOptions, setAccordOptions] = useState<string[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [pageSize] = useState(getPageSize);
  const debouncedSearch = useDebounce(filters.search, 400);

  useEffect(() => {
    getAccords()
      .then((res: { data: string[] }) => setAccordOptions(res.data))
      .catch(() => {});
  }, []);

  // 필터 변경 시 페이지 리셋
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, filters.accords.join(','), filters.gender, filters.sort]);

  // 페이지 또는 필터 변경 시 fetch
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setFetchError(false);

    getPerfumes({
      ...(debouncedSearch && { keyword: debouncedSearch }),
      ...(GENDER_MAP[filters.gender] && { gender: GENDER_MAP[filters.gender] }),
      ...(filters.accords.length > 0 && { accord: filters.accords }),
      sort: SORT_MAP[filters.sort] ?? 'rating_desc',
      page,
      size: pageSize,
    })
      .then((res: { data: PerfumeListResponse }) => {
        if (cancelled) return;
        const items = res.data.content;
        setPerfumes((prev) => (page === 0 ? items : [...prev, ...items]));
        setHasMore(res.data.hasNext);
      })
      .catch(() => {
        if (!cancelled) setFetchError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch, filters.accords.join(','), filters.gender, filters.sort, pageSize]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading || fetchError || perfumes.length === 0) return;
    setPage((prev) => prev + 1);
  }, [hasMore, isLoading, fetchError, perfumes.length]);

  const sentinelRef = useInfiniteScroll(handleLoadMore);

  return (
    <div className="main-page">
      <div className="main-page__content">
        <div className="main-page__block main-page__block--main">
          <SearchInput variant="main" value={filters.search} onChange={setSearch} />
        </div>

        <div className="main-page__dropdown-group">
          <div className="main-page__dropdown-group-left">
            <FilterDropdown
              label="계열"
              options={accordOptions}
              selectedValues={filters.accords}
              onSelect={updateAccord}
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

        <div className="main-page__grid">
          {fetchError ? (
            <p className="main-page__empty">
              향수 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
            </p>
          ) : isLoading && perfumes.length === 0 ? (
            <p className="main-page__loading">향수를 불러오는 중...</p>
          ) : perfumes.length === 0 ? (
            <p className="main-page__empty">해당 조건에 맞는 향수가 없어요!</p>
          ) : (
            <PerfumeGrid
              variant="main"
              perfumes={perfumes}
              selectedCategories={filters.accords}
              onRemoveCategory={removeAccord}
              onSelectPerfume={(perfume) => navigate(`/perfume/${perfume.id}`)}
            />
          )}
        </div>
        {hasMore && !fetchError && <div ref={sentinelRef} />}
        {isLoading && perfumes.length > 0 && <p className="main-page__loading">불러오는 중...</p>}
      </div>
    </div>
  );
};

export default MainPage;
