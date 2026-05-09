import { useState } from 'react';

export const usePerfumeFilters = () => {
  const [search, setSearch] = useState('');
  const [accords, setAccords] = useState<string[]>([]);
  const [gender, setGender] = useState('');
  const [sort, setSort] = useState('높은 평점순');

  const updateAccord = (selected: string) => {
    setAccords((prev) =>
      prev.includes(selected) ? prev.filter((a) => a !== selected) : [...prev, selected],
    );
  };

  const removeAccord = (selected: string) => {
    setAccords((prev) => prev.filter((a) => a !== selected));
  };

  const updateGender = (selectedGender: string) => {
    setGender(selectedGender === 'None' ? '' : selectedGender);
  };

  const filters = {
    search,
    accords,
    gender,
    sort,
  };

  return {
    filters,
    setSearch,
    updateAccord,
    removeAccord,
    updateGender,
    setSort,
  };
};
