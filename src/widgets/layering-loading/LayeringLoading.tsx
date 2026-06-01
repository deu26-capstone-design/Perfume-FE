import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './LayeringLoading.css';

const TIPS = [
  {
    id: '01',
    title: '가벼운 향 먼저, 무거운 향은 나중에',
    desc: '시트러스, 그린, 머스크 등 가벼운 향은 빨리 증발하는 반면, 우디나 바닐라 등 무거운 향은 오래 지속됩니다. 무거운 향을 나중에 덮어주면 향이 날아가는 것을 막아줍니다.',
  },
  {
    id: '02',
    title: '비슷한 향 계열로 조합하기',
    desc: '어떤 향수를 섞을지 고민된다면, 같은 노트나 비슷한 향 계열을 가진 향수들을 매치해 보세요. 향이 부딪히지 않고 자연스럽게 어우러집니다.',
  },
  {
    id: '03',
    title: '신체 부위별로 따로 뿌리기',
    desc: '무거운 향일수록 하체에, 가벼운 향일수록 상체에 뿌려보세요. 걸을 때마다 공기 중에서 두 향기가 입체적으로 섞이는 매력을 느낄 수 있습니다.',
  },
];

interface LayeringLoadingProps {
  onCancel?: () => void;
}

export const LayeringLoading = ({ onCancel }: LayeringLoadingProps) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const timer = setInterval(() => {
      setIsFading(true);
      timeoutId = setTimeout(() => {
        setCurrentTip((prev) => (prev + 1) % TIPS.length);
        setIsFading(false);
      }, 500);
    }, 4000);

    return () => {
      clearInterval(timer);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="loading-overlay">
      {onCancel && (
        <button className="loading-close-btn" onClick={onCancel} aria-label="로딩 취소">
          <FiX size={24} />
        </button>
      )}

      <div className="loading-content">
        <div className="spinner-wrapper">
          <div className="editorial-spinner"></div>
          <span className="loading-subtitle">AI가 결과를 분석 중입니다</span>
        </div>

        <div className={`tip-container ${isFading ? 'tip-fade-out' : 'tip-fade-in'}`}>
          <span className="tip-number">{TIPS[currentTip].id}</span>
          <h4 className="tip-title">{TIPS[currentTip].title}</h4>
          <p className="tip-desc">{TIPS[currentTip].desc}</p>
        </div>
      </div>
    </div>
  );
};
