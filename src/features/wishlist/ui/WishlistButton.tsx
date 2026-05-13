import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '@features/auth/model/useAuth';
import { addWishlist, removeWishlist } from '../api/wishlistApi';
import '../styles/WishlistButton.css';

const getStoredWishlist = (userId: number): number[] => {
  try {
    return JSON.parse(localStorage.getItem(`wishlist_${userId}`) ?? '[]');
  } catch {
    return [];
  }
};

const saveWishlist = (userId: number, ids: number[]) => {
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(ids));
};

interface Props {
  perfumeId: number;
}

export default function WishlistButton({ perfumeId }: Props) {
  const { isLogin, userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!userId) return;
    setIsWishlisted(getStoredWishlist(userId).includes(perfumeId));
  }, [userId, perfumeId]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2000);
  };

  const handleClick = async () => {
    if (!isLogin) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    if (!userId || isLoading) return;

    setIsLoading(true);
    const next = !isWishlisted;
    setIsWishlisted(next);

    try {
      if (next) {
        await addWishlist(perfumeId, userId);
        saveWishlist(userId, [
          ...getStoredWishlist(userId).filter((id) => id !== perfumeId),
          perfumeId,
        ]);
        showToast('위시리스트에 추가됐어요!');
      } else {
        await removeWishlist(perfumeId, userId);
        saveWishlist(
          userId,
          getStoredWishlist(userId).filter((id) => id !== perfumeId),
        );
        showToast('위시리스트에서 제거됐어요.');
      }
    } catch (err: unknown) {
      const status = (err as { response?: { status: number } })?.response?.status;
      if (next && status === 409) {
        setIsWishlisted(true);
        saveWishlist(userId, [
          ...getStoredWishlist(userId).filter((id) => id !== perfumeId),
          perfumeId,
        ]);
        showToast('위시리스트에 추가됐어요!');
      } else {
        setIsWishlisted(!next);
        showToast('잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wishlist-wrapper">
      <button
        type="button"
        className="wishlist-btn"
        onClick={handleClick}
        aria-label={isWishlisted ? '위시리스트에서 제거' : '위시리스트에 추가'}
        disabled={isLoading}
      >
        {isWishlisted ? (
          <FaHeart className="wishlist-btn__icon wishlist-btn__icon--active" />
        ) : (
          <FaRegHeart className="wishlist-btn__icon" />
        )}
      </button>
      {toast && <span className="wishlist-toast">{toast}</span>}
    </div>
  );
}
