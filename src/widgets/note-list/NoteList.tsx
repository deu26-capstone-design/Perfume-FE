import { useState, useEffect, useRef, useCallback } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import NoteCard from '@features/notes/NoteCard';
import { accordsApi, type NoteItem } from '@entities/accords/api/accordsApi';
import './NoteList.css';

interface Props {
  accordId: number;
}

const NoteList = ({ accordId }: Props) => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const isFetchingRef = useRef(false);
  const requestSeqRef = useRef(0);

  const getInitialLimit = () => {
    if (window.innerWidth < 767) return 3;
    if (window.innerWidth < 1023) return 4;
    return 5;
  };
  const [initialLimit, setInitialLimit] = useState(5);

  useEffect(() => {
    setInitialLimit(getInitialLimit());
    const handleResize = () => {
      setInitialLimit(getInitialLimit());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchNotes = useCallback(
    async (targetPage: number, reset = false) => {
      if (isFetchingRef.current && !reset) return;

      const requestSeq = ++requestSeqRef.current;

      isFetchingRef.current = true;
      setIsFetching(true);
      try {
        const data = await accordsApi.getAccordNotes(accordId, targetPage, 30);
        if (requestSeq !== requestSeqRef.current) return;
        setNotes((prev) => (reset ? data.content : [...prev, ...data.content]));
        setHasNext(data.hasNext);
        setPage(data.pageNum);
      } catch (e) {
        console.error('노트 목록을 불러오는데 실패했습니다.', e);
      } finally {
        if (requestSeq === requestSeqRef.current) {
          isFetchingRef.current = false;
          setIsFetching(false);
        }
      }
    },
    [accordId],
  );

  useEffect(() => {
    requestSeqRef.current += 1;
    isFetchingRef.current = false;
    setNotes([]);
    setPage(0);
    setHasNext(false);
    setIsExpanded(false);

    fetchNotes(0, true);
  }, [accordId, fetchNotes]);

  useEffect(() => {
    if (!isExpanded || !hasNext || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNotes(page + 1);
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.1,
      },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [isExpanded, hasNext, isFetching, page, fetchNotes]);

  const displayNotes = isExpanded ? notes : notes.slice(0, initialLimit);

  return (
    <div className={`notes-frame ${isExpanded ? 'expanded' : ''}`}>
      <div className="notes-scroll-container" ref={scrollContainerRef}>
        <div className="notes-grid">
          {displayNotes.map((note, idx) => (
            <div key={`${note.name}-${idx}`} className="notes-item">
              <NoteCard imageUrl={note.imageUrl} name={note.name} />
            </div>
          ))}
        </div>

        {isExpanded && hasNext && (
          <div ref={observerRef} className="notes-infinite-trigger">
            {isFetching && (
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  color: 'gray',
                  padding: '10px 0',
                }}
              >
                불러오는 중...
              </div>
            )}
          </div>
        )}
      </div>

      <div className="notes-btn-wrapper">
        {!isExpanded && notes.length > initialLimit && (
          <button className="notes-action-btn" onClick={() => setIsExpanded(true)}>
            전체 보기 <FiChevronDown />
          </button>
        )}

        {isExpanded && (
          <button
            className="notes-action-btn"
            onClick={() => {
              setIsExpanded(false);
              if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
            }}
          >
            닫기 <FiChevronUp />
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteList;
