import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_SORT = '높은 평점순';

export const usePerfumeFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('q') ?? '';
  const accords = useMemo(
    () => searchParams.getAll('accord'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams.getAll('accord').join(',')],
  );
  const gender = searchParams.get('gender') ?? '';
  const sort = searchParams.get('sort') ?? DEFAULT_SORT;

  const setSearch = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set('q', value);
        else next.delete('q');
        return next;
      },
      { replace: true },
    );
  };

  const updateAccord = (selected: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        const current = next.getAll('accord');
        next.delete('accord');
        const updated = current.includes(selected)
          ? current.filter((a) => a !== selected)
          : [...current, selected];
        updated.forEach((a) => next.append('accord', a));
        return next;
      },
      { replace: true },
    );
  };

  const removeAccord = (selected: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        const current = next.getAll('accord').filter((a) => a !== selected);
        next.delete('accord');
        current.forEach((a) => next.append('accord', a));
        return next;
      },
      { replace: true },
    );
  };

  const updateGender = (selectedGender: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (selectedGender && selectedGender !== 'None') next.set('gender', selectedGender);
        else next.delete('gender');
        return next;
      },
      { replace: true },
    );
  };

  const setSort = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== DEFAULT_SORT) next.set('sort', value);
        else next.delete('sort');
        return next;
      },
      { replace: true },
    );
  };

  return {
    filters: { search, accords, gender, sort },
    setSearch,
    updateAccord,
    removeAccord,
    updateGender,
    setSort,
  };
};
