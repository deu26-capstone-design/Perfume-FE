import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useAuth } from '@features/auth/model/useAuth';
import { removeMyWishlist } from '@features/wishlist/api/myWishlistApi';
import '../styles/WishlistButton.css';

interface WishlistRemoveButtonProps {
  perfumeId: number;
  onRemove: (id: number) => void;
}

export default function WishlistRemoveButton({ perfumeId, onRemove }: WishlistRemoveButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();

  const handleRemoveClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsLoading(true);
    try {
      await removeMyWishlist(perfumeId);
      if (userId) {
        try {
          const storageKey = `wishlist_${userId}`;
          const stored = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
          const updated = stored.filter((id: number) => id !== perfumeId);
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (err) {
          console.error('로컬 스토리지 업데이트 실패:', err);
        }
      }

      onRemove(perfumeId);
    } catch (error: any) {
      console.error('위시리스트 삭제 중 오류 발생:', error);
      alert(error.response?.data?.message || '삭제에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="wishlist-btn"
      onClick={handleRemoveClick}
      disabled={isLoading}
      aria-label="위시리스트에서 삭제"
    >
      <FaHeart className="wishlist-btn__icon wishlist-btn__icon--active" />
    </button>
  );
}
