import { useRef, useState, useEffect, useCallback } from 'react';

export const useCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);

  const checkScroll = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);

    const page = Math.round(scrollLeft / clientWidth);
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current || !trackRef.current.firstElementChild) return;
    const track = trackRef.current;
    const firstItem = track.firstElementChild as HTMLElement;
    const itemWidth = firstItem.getBoundingClientRect().width;
    const gapStyle = window.getComputedStyle(track).gap;
    const gap = parseFloat(gapStyle) || 0;
    const itemsToScroll = window.innerWidth <= 767 ? 3 : 5;
    const scrollAmount = (itemWidth + gap) * itemsToScroll;

    track.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToPage = (pageIndex: number) => {
    if (!trackRef.current || !trackRef.current.firstElementChild) return;
    const track = trackRef.current;
    const firstItem = track.firstElementChild as HTMLElement;
    const itemWidth = firstItem.getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
    const itemsToScroll = window.innerWidth <= 767 ? 3 : 5;
    const scrollAmount = (itemWidth + gap) * itemsToScroll;

    track.scrollTo({
      left: scrollAmount * pageIndex,
      behavior: 'smooth',
    });
  };

  return {
    trackRef,
    canScrollLeft,
    canScrollRight,
    checkScroll,
    scroll,
    currentPage,
    scrollToPage,
  };
};
