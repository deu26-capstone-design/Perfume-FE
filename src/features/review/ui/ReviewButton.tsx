import '../styles/ReviewButton.css';

interface Props {
  onClick?: () => void;
}

export default function ReviewWriteButton({ onClick }: Props) {
  return (
    <button type="button" className="reviewWrite-btn" onClick={onClick}>
      리뷰 작성하기
    </button>
  );
}
