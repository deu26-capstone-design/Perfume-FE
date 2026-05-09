import { useCarousel } from '@shared/lib/hooks/useCarousel';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import NoteCard from '@features/notes/NoteCard';
import './NoteCarousel.css';

export interface Note {
  name: string;
  imageUrl: string;
}

interface NoteCarouselProps {
  notes: Note[];
}

const mockNotes = [
  { name: 'bergamot', imageUrl: 'https://fimgs.net/mdimg/sastojci/m.75.jpg?1733161266' },
  { name: 'lemon', imageUrl: 'https://fimgs.net/mdimg/sastojci/m.75.jpg?1733161266' },
  { name: 'orange', imageUrl: 'https://fimgs.net/mdimg/sastojci/m.75.jpg?1733161266' },
  { name: 'vanilla', imageUrl: 'https://fimgs.net/mdimg/sastojci/m.75.jpg?1733161266' },
  { name: 'rose', imageUrl: 'https://fimgs.net/mdimg/sastojci/m.75.jpg?1733161266' },
  { name: 'jasmine', imageUrl: 'https://fimgs.net/mdimg/sastojci/m.75.jpg?1733161266' },
  { name: 'musk', imageUrl: 'https://fimgs.net/mdimg/sastojci/m.75.jpg?1733161266' },
  { name: 'sandalwood', imageUrl: 'https://fimgs.net/mdimg/sastojci/m.75.jpg?1733161266' },
];

const NoteCarousel = ({ notes }: NoteCarouselProps) => {
  const { trackRef, canScrollLeft, canScrollRight, checkScroll, scroll } = useCarousel();

  const displayNotes = notes && notes.length > 0 ? notes : mockNotes;

  return (
    <div className="carousel-wrapper">
      <button
        className={`carousel-btn left ${!canScrollLeft ? 'hidden' : ''}`}
        onClick={() => scroll('left')}
      >
        <FiChevronLeft />
      </button>

      <div className="carousel-track" ref={trackRef} onScroll={checkScroll}>
        {displayNotes.map((note) => (
          <div key={note.name} className="carousel-item">
            <NoteCard imageUrl={note.imageUrl} name={note.name} />
          </div>
        ))}
      </div>

      <button
        className={`carousel-btn right ${!canScrollRight ? 'hidden' : ''}`}
        onClick={() => scroll('right')}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default NoteCarousel;
