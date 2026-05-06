import './LayeringButton.css';

interface LayeringButtonProps {
  onClick?: () => void;
  label?: string;
}

const LayeringButton: React.FC<LayeringButtonProps> = ({ onClick, label = '조합하기' }) => {
  return (
    <div className="button-container">
      <button type="button" className="layering-button" onClick={onClick}>
        <span className="button-text">{label}</span>
      </button>
    </div>
  );
};

export default LayeringButton;
