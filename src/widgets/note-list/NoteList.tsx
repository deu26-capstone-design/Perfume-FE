import { useState, useEffect, useRef, useCallback } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import NoteCard from '@features/notes/NoteCard';
import type { Accord } from '@entities/accords/model/accordsType';
import './NoteList.css';

interface NoteListProps {
  notes?: Accord['notes'];
}

// 넉넉한 테스트용 Mock 데이터 (40개)
const mockNotes: Accord['notes'] = Array.from({ length: 40 }).map((_, i) => ({
  name: `Note ${i + 1}`,
  imageUrl: 'https://fimgs.net/mdimg/sastojci/m.75.jpg?1733161266',
}));

const NoteList = ({ notes }: NoteListProps) => {
  const data = notes && notes.length > 0 ? notes : mockNotes;

  // 화면 크기에 따른 초기 노출 개수 (데스크탑 5, 태블릿 4, 모바일 3)
  const getInitialLimit = useCallback(() => {
    if (typeof window === 'undefined') return 5;
    if (window.innerWidth < 768) return 3;
    if (window.innerWidth < 1024) return 4;
    return 5;
  }, []);

  const [initialLimit, setInitialLimit] = useState(getInitialLimit());
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(initialLimit);

  const observerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 반응형 리사이즈 대응
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setInitialLimit(getInitialLimit()), 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [getInitialLimit]);

  // 전개 상태에 따른 렌더링 개수 설정 및 스크롤 초기화
  useEffect(() => {
    if (isExpanded) {
      setLoadedCount(initialLimit * 3);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else {
      setLoadedCount(initialLimit);
    }
  }, [isExpanded, initialLimit]);

  // 내부 무한 스크롤
  useEffect(() => {
    if (!isExpanded || loadedCount >= data.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadedCount((prev) => Math.min(prev + initialLimit * 2, data.length));
        }
      },
      { root: scrollContainerRef.current, threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isExpanded, loadedCount, data.length, initialLimit]);

  const displayNotes = isExpanded ? data.slice(0, loadedCount) : data.slice(0, initialLimit);
  const hasMoreInInitial = data.length > initialLimit;

  return (
    <div className={`notes-frame ${isExpanded ? 'expanded' : ''}`}>
      <div className="notes-scroll-container" ref={scrollContainerRef}>
        <div className="notes-grid">
          {displayNotes.map((note, index) => (
            <div key={`${note.name}-${index}`} className="notes-item">
              <NoteCard imageUrl={note.imageUrl} name={note.name} />
            </div>
          ))}
        </div>

        {/* 무한 스크롤 감지 영역 */}
        {isExpanded && loadedCount < data.length && (
          <div ref={observerRef} className="notes-loading-trigger" />
        )}
      </div>

      {/* 하단 버튼 영역 */}
      <div className="notes-btn-wrapper">
        {!isExpanded && hasMoreInInitial && (
          <button className="notes-action-btn" onClick={() => setIsExpanded(true)}>
            전체 노트 보기 <FiChevronDown />
          </button>
        )}

        {isExpanded && (
          <button className="notes-action-btn collapse" onClick={() => setIsExpanded(false)}>
            닫기 <FiChevronUp />
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteList;
