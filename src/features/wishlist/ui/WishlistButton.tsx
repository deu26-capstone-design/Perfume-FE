import '../styles/WishlistButton.css';

interface Props {
  perfumeId: number;
}

export default function WishlistButton({ perfumeId: _perfumeId }: Props) {
  return <button className="wishlist-btn">위시리스트에 추가</button>;
}
