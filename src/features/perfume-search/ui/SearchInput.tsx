import React, { useId } from 'react';
import { IoSearch } from 'react-icons/io5';
import './SearchInput.css';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit?: () => void;
  variant?: 'main' | 'layering';
}

export const SearchInput = ({ value, onChange, onSubmit, variant = 'main' }: SearchInputProps) => {
  const inputId = useId();

  const placeholder =
    variant === 'main' ? '제품명이나 브랜드명을 입력해주세요!' : 'Search for perfumes';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className={`search-container ${variant}`}>
      <input
        type="text"
        id={inputId}
        name="search"
        className="search-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={variant === 'main' ? '향수 검색' : 'Perfume search'}
      />
      <button type="submit" className="search-icon-btn" aria-label="검색 실행">
        <IoSearch className="search-icon" />
      </button>
    </div>
  );
};
