import type { Question } from '../model/types';

interface Props {
  question: Question;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

const QuestionCard = ({ question, selectedIndex, onSelect, disabled = false }: Props) => {
  return (
    <div className="question-card">
      <p className="question-card__text">{question.question}</p>
      <ul className="question-card__answers">
        {question.answers.map((answer, i) => (
          <li key={i}>
            <button
              className={`question-card__answer ${selectedIndex === i ? 'question-card__answer--selected' : ''}`}
              onClick={() => onSelect(i)}
              disabled={disabled}
            >
              {answer.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
