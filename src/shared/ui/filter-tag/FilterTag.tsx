import React from 'react';
import './FilterTag.css';

interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

export const FilterTag = ({ label, onRemove }: FilterTagProps) => {
  return (
    <div className="filter-tag">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="remove-btn"
        aria-label={`${label} 필터 삭제`}
      >
        x
      </button>
    </div>
  );
};
