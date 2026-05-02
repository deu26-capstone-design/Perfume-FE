import '../../wishlist/styles/WishlistButton.css';
//위시리스트 버튼이랑 디자인이 같아서 위시리스트버튼의 css 그대로 적용

interface Props {
  onClick?: () => void;
}

export default function ReviewButton({ onClick }: Props) {
  return (
    <button type="button" className="wishlist-btn" onClick={onClick}>
      리뷰 작성하기
    </button>
  );
}
