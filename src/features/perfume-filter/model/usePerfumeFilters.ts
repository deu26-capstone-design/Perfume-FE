import { useState } from 'react';

export const usePerfumeFilters = () => {
  /* 상태 관리 */
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [gender, setGender] = useState('');
  const [sort, setSort] = useState('높은 평점순');

  /* 계열 필터 토글 (추가/삭제) */
  const updateCategory = (category: string) => {
    setCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  /* 선택된 계열 태그 개별 삭제 */
  const removeCategory = (category: string) => {
    setCategories((prev) => prev.filter((item) => item !== category));
  };

  /* 성별 필터 선택 ('None' 처리 포함) */
  const updateGender = (selectedGender: string) => {
    setGender(selectedGender === 'None' ? '' : selectedGender);
  };

  /* 필터 상태 객체 */
  const filters = {
    search,
    categories,
    gender,
    sort,
  };

  return {
    filters,
    setSearch,
    updateCategory,
    removeCategory,
    updateGender,
    setSort,
  };
};
