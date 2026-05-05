import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import '../styles/WishlistButton.css';

interface Props {
  perfumeId: number;
}

export default function WishlistButton({ perfumeId: _perfumeId }: Props) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <button
      type="button"
      className="wishlist-btn"
      onClick={() => setIsWishlisted((prev) => !prev)}
      aria-label={isWishlisted ? '위시리스트에서 제거' : '위시리스트에 추가'}
    >
      {isWishlisted
        ? <FaHeart className="wishlist-btn__icon wishlist-btn__icon--active" />
        : <FaRegHeart className="wishlist-btn__icon" />
      }
    </button>
  );
}
