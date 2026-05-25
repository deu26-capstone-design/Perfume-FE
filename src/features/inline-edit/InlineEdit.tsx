import { useState, useEffect } from 'react';
import './InlineEdit.css';

interface InlineEditProps {
  label: string;
  initialValue: string;
  isPhone?: boolean;
  onSave: (newValue: string) => Promise<void> | void;
}

export default function InlineEdit({
  label,
  initialValue,
  isPhone = false,
  onSave,
}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [tempValue, setTempValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

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
      if (inputValue.length > 13) return;
    }

    setTempValue(inputValue);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(tempValue);

      setValue(tempValue);
      setIsEditing(false);
    } catch (error) {
      console.error('수정 실패');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTempValue(value);
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
              disabled={isSaving}
            />
            <div className="edit-text-actions">
              <button
                type="button"
                className="text-action-btn cancel"
                onClick={handleCancel}
                disabled={isSaving}
              >
                취소
              </button>
              <button
                type="button"
                className="text-action-btn save"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? '저장 중...' : '저장'}
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
