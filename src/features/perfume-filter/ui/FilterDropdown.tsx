import React, { useState, useRef, useEffect } from 'react';
import './FilterDropdown.css';

interface FilterDropdownProps {
  label: string;
  options: string[];
  value?: string;
  onSelect: (option: string) => void;
}

//  필터 드롭다운 컴포넌트
// - 클릭 시 옵션 리스트 토글
// - 외부 클릭 시 자동 닫힘
// - 선택 값은 부모 state로 전달
export const FilterDropdown = ({ label, options, value, onSelect }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 옵션 선택
  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* 값이 있으면 value를, 없으면 초기 label을 표시 */}
        <span className="dropdown-label">{value || label}</span>

        <div className={`arrow-wrapper ${isOpen ? 'is-open' : ''}`}>
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
            <path
              d="M0.0660252 0.442518C0.125281 0.310698 0.221362 0.198807 0.342709 0.120304C0.464055 0.0418015 0.605499 3.14713e-05 0.750025 1.90735e-05H12.75C12.8946 -2.00272e-05 13.0361 0.0417261 13.1575 0.120232C13.2789 0.198737 13.375 0.310657 13.4343 0.442518C13.4936 0.574379 13.5135 0.720561 13.4916 0.863468C13.4697 1.00638 13.407 1.13992 13.311 1.24802L7.31102 7.99802C7.24065 8.07733 7.15427 8.14081 7.05757 8.18429C6.96087 8.22776 6.85605 8.25024 6.75003 8.25024C6.644 8.25024 6.53918 8.22776 6.44248 8.18429C6.34578 8.14081 6.25939 8.07733 6.18903 7.99802L0.189025 1.24802C0.0930738 1.13989 0.0304163 1.00633 0.00859447 0.863428C-0.0132274 0.720522 0.00671628 0.574355 0.0660252 0.442518Z"
              fill="var(--gray-300)"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${value === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
