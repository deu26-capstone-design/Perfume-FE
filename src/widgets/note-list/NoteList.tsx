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

  const observerRef = useRef<HTMLDivElement>(null);

  const fetchNotes = useCallback(
    async (targetPage: number, reset = false) => {
      if (isFetching) return;

      setIsFetching(true);
      try {
        const data = await accordsApi.getAccordNotes(accordId, targetPage, 30);
        setNotes((prev) => (reset ? data.content : [...prev, ...data.content]));
        setHasNext(data.hasNext);
        setPage(data.pageNum);
      } catch (e) {
        console.error('노트 목록을 불러오는데 실패했습니다.', e);
      } finally {
        setIsFetching(false);
      }
    },
    [accordId, isFetching],
  );

  // 카테고리(accordId)가 변경될 때마다 초기화
  useEffect(() => {
    setNotes([]);
    setPage(0);
    setHasNext(false);
    setIsExpanded(false);

    fetchNotes(0, true);
  }, [accordId]);

  useEffect(() => {
    if (!isExpanded || !hasNext || isFetching) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNotes(page + 1);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [isExpanded, hasNext, isFetching, page, fetchNotes]);

  const displayNotes = isExpanded ? notes : notes.slice(0, 5);

  return (
    <div className={`notes-frame ${isExpanded ? 'expanded' : ''}`}>
      <div className="notes-grid">
        {displayNotes.map((note, idx) => (
          <div key={`${note.name}-${idx}`}>
            <NoteCard imageUrl={note.imageUrl} name={note.name} />
          </div>
        ))}
      </div>

      {isExpanded && hasNext && (
        <div ref={observerRef} style={{ height: 40, marginTop: 10 }}>
          {isFetching && (
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'gray' }}>
              불러오는 중...
            </div>
          )}
        </div>
      )}

      <div className="notes-btn-wrapper">
        {!isExpanded && notes.length > 5 && (
          <button onClick={() => setIsExpanded(true)}>
            전체 보기 <FiChevronDown />
          </button>
        )}

        {isExpanded && (
          <button
            onClick={() => {
              setIsExpanded(false);
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
