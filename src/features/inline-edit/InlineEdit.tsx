import { useState, useEffect } from 'react';
import './InlineEdit.css';

interface InlineEditProps {
  label: string;
  initialValue: string;
  isPhone?: boolean;
}

export default function InlineEdit({ label, initialValue, isPhone = false }: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [tempValue, setTempValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
    setTempValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (isPhone) {
      const onlyNumbers = inputValue.replace(/[^0-9]/g, '');
      if (onlyNumbers.length <= 3) {
        inputValue = onlyNumbers;
      } else if (onlyNumbers.length <= 7) {
        inputValue = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
      } else {
        inputValue = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
      }
      if (inputValue.length > 13) return; // 010-1234-5678 길이 제한
    }

    setTempValue(inputValue);
  };

  const handleSave = () => {
    setValue(tempValue);
    setIsEditing(false);
    // TODO: 백엔드 정보 수정 API 호출 (label, tempValue 활용)
  };

  const handleCancel = () => {
    setTempValue(value); // 기존 값으로 원상복구
    setIsEditing(false);
  };

  return (
    <div className="info-row">
      <span className="info-label">{label}</span>

      <div className="info-content-area">
        {isEditing ? (
          <div className="info-edit-mode">
            <input
              type="text"
              className="info-input"
              value={tempValue}
              onChange={handleChange}
              placeholder={isPhone ? '숫자만 입력해주세요' : `${label} 입력`}
              autoFocus
            />
            <div className="edit-text-actions">
              <button type="button" className="text-action-btn cancel" onClick={handleCancel}>
                취소
              </button>
              <button type="button" className="text-action-btn save" onClick={handleSave}>
                저장
              </button>
            </div>
          </div>
        ) : (
          <div className="info-display-mode">
            <span className="info-value">{value}</span>
            <button
              type="button"
              className="text-edit-trigger-btn"
              onClick={() => setIsEditing(true)}
            >
              수정
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
