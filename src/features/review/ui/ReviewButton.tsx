import '../styles/ReviewButton.css';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
}

export default function ReviewWriteButton({ onClick, disabled }: Props) {
  return (
    <button type="button" className="reviewWrite-btn" onClick={onClick} disabled={disabled}>
      {disabled ? '확인 중...' : '리뷰 작성하기'}
    </button>
  );
}
