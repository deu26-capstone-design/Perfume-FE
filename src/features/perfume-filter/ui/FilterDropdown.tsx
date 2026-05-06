import { useState, useRef, useEffect, useId } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import './FilterDropdown.css';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValues?: string | string[]; // 배열(다중) 또는 문자열(단일)
  onSelect: (option: string) => void;
}

export const FilterDropdown = ({
  label,
  options,
  selectedValues = [],
  onSelect,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    // 다중 선택이 아닐 때만 선택 후 창 닫기
    if (!Array.isArray(selectedValues)) {
      setIsOpen(false);
    }
  };

  const checkIsSelected = (option: string) => {
    if (Array.isArray(selectedValues)) {
      return selectedValues.includes(option);
    }
    return selectedValues === option;
  };

  const getDisplayText = () => {
    if (Array.isArray(selectedValues)) {
      // 다중 선택일 경우 (예: "Aromatic, Citrus")
      return selectedValues.length > 0 ? selectedValues.join(', ') : label;
    }
    // 단일 선택일 경우 (선택된 문자열이 있으면 그걸 보여주고, 없으면 기본 라벨)
    return selectedValues ? selectedValues : label;
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
      >
        <span className="dropdown-label">{getDisplayText()}</span>
        <div className={`arrow-wrapper ${isOpen ? 'is-open' : ''}`}>
          <IoMdArrowDropdown className="dropdown-icon" />
        </div>
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          className="dropdown-menu"
          role="listbox"
          aria-label={label}
          aria-multiselectable={Array.isArray(selectedValues) || undefined}
        >
          {options.map((option) => {
            const isSelected = checkIsSelected(option);

            return (
              <li key={option}>
                <button
                  type="button"
                  className={`dropdown-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                  role="option"
                  aria-selected={isSelected}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
