interface Props {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: Props) => {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="progress">
      <div className="progress__label">
        {current} / {total}
      </div>
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
