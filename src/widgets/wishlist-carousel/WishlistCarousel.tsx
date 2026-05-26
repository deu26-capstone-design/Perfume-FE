import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PerfumeInfoCard from '@entities/perfume/ui/card/PerfumeInfoCard';
import WishlistRemoveButton from '@features/wishlist/ui/WishlistRemoveButton';
import { useCarousel } from '@shared/lib/hooks/useCarousel';
import { getMyWishlist, type WishlistItem } from '@features/wishlist/api/myWishlistApi';
import './WishlistCarousel.css';

export default function WishlistCarousel() {
  const {
    trackRef,
    canScrollLeft,
    canScrollRight,
    checkScroll,
    scroll,
    currentPage,
    scrollToPage,
  } = useCarousel();
  const [perfumes, setPerfumes] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth <= 767 ? 3 : 5);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth <= 767 ? 3 : 5);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(perfumes.length / itemsPerPage);

  useEffect(() => {
    let isMounted = true;

    getMyWishlist()
      .then((data) => {
        if (isMounted) {
          setPerfumes(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('위시리스트 로딩 실패:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      checkScroll();
    }
  }, [perfumes.length, isLoading, checkScroll]);

  const handleRemovePerfume = (idToRemove: number) => {
    setPerfumes((prevPerfumes) => prevPerfumes.filter((p) => p.perfumeId !== idToRemove));
  };

  // 마지막 페이지의 더미 아이템
  const remainder = perfumes.length % itemsPerPage;
  const dummyCount = remainder === 0 ? 0 : itemsPerPage - remainder;

  if (isLoading) {
    return (
      <section className="wishlist-carousel-section">
        <h2 className="wishlist-title">위시리스트</h2>
        <div className="wishlist-status-container">
          <div className="wishlist-spinner"></div>
          <p className="wishlist-status-text">위시리스트를 불러오는 중입니다...</p>
        </div>
      </section>
    );
  }

  if (perfumes.length === 0) {
    return (
      <section className="wishlist-carousel-section">
        <h2 className="wishlist-title">위시리스트</h2>
        <div className="wishlist-status-container">
          <p className="wishlist-status-text">위시리스트가 비어있습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="wishlist-carousel-section">
      <h2 className="wishlist-title">위시리스트</h2>

      <div className="carousel-container">
        {canScrollLeft && (
          <button
            className="carousel-nav-btn prev"
            onClick={() => scroll('left')}
            aria-label="이전 항목 보기"
          >
            <FaChevronLeft />
          </button>
        )}

        <div className="carousel-track" ref={trackRef} onScroll={checkScroll}>
          {perfumes.map((perfume) => (
            <div
              key={perfume.perfumeId}
              className="carousel-item"
              onClick={() => navigate(`/perfume/${perfume.perfumeId}`)}
            >
              <div className="wishlist-btn-wrapper">
                <WishlistRemoveButton
                  perfumeId={perfume.perfumeId}
                  onRemove={handleRemovePerfume}
                />
              </div>

              <PerfumeInfoCard
                brand={perfume.brand}
                name={perfume.name}
                imageUrl={perfume.imageUrl}
                align="center"
                direction="column"
              />
            </div>
          ))}

          {/* 더미 아이템 렌더링 */}
          {Array.from({ length: dummyCount }).map((_, idx) => (
            <div
              key={`dummy-${idx}`}
              className="carousel-item dummy"
              style={{ visibility: 'hidden' }}
            />
          ))}
        </div>

        {canScrollRight && (
          <button
            className="carousel-nav-btn next"
            onClick={() => scroll('right')}
            aria-label="다음 항목 보기"
          >
            <FaChevronRight />
          </button>
        )}
      </div>

      {totalPages > 1 && (
        <div className="carousel-pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`pagination-dot ${currentPage === index ? 'active' : ''}`}
              onClick={() => scrollToPage(index)}
              aria-label={`${index + 1}번째 페이지로 이동`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
