import type { Accord } from '@entities/accords/model/accordsType';
import './NoteCard.css';

type NoteProps = Accord['notes'][number];

const NoteCard = ({ imageUrl, name }: NoteProps) => {
  const testImage = 'https://fimgs.net/mdimg/sastojci/m.75.jpg?1733161266';
  return (
    <div className="note-card">
      <img src={imageUrl || testImage} alt={name} className="note-image" />
      <span className="note-name">{name}</span>
    </div>
  );
};

export default NoteCard;
