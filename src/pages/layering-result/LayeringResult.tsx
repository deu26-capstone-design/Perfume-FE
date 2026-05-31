import { useRef, useEffect } from 'react';
import { FiX, FiDownload, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { toPng } from 'html-to-image';
import { layeringToast } from '../Layering/model/layeringToast';
import type { LayeringRecommendationResponse } from '@entities/layering/api/layeringApi';
import './LayeringResult.css';

interface LayeringResultProps {
  isOpen: boolean;
  onClose: () => void;
  data: LayeringRecommendationResponse | null;
}

export const LayeringResult = ({ isOpen, onClose, data }: LayeringResultProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeButtonREF = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownloadImage = async () => {
    if (!cardRef.current || !buttonRef.current || !closeButtonREF.current) return;

    const cardElement = cardRef.current;
    const buttonElement = buttonRef.current;
    const closeButtonElement = closeButtonREF.current;

    const currentWidth = cardElement.offsetWidth;
    const prevPaddingBottom = cardElement.style.paddingBottom;
    const prevButtonDisplay = buttonElement.style.display;
    const prevCloseDisplay = closeButtonElement.style.display;

    try {
      buttonElement.style.display = 'none';
      closeButtonElement.style.display = 'none';
      cardElement.style.paddingBottom = '0.5rem';

      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(cardElement, {
        cacheBust: true,
        pixelRatio: 2,
        width: currentWidth,
        style: {
          margin: '0',
          transform: 'none',
        },
      });

      const link = document.createElement('a');
      link.download = `layering-result-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      layeringToast('결과가 기기에 저장되었습니다!', {
        id: 'save-result-toast',
      });
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      layeringToast('이미지 저장에 실패했습니다.\n다시 시도해주세요.', {
        id: 'save-result-failure-toast',
      });
    } finally {
      cardElement.style.paddingBottom = prevPaddingBottom;
      buttonElement.style.display = prevButtonDisplay;
      closeButtonElement.style.display = prevCloseDisplay;
    }
  };

  if (!isOpen || !data) return null;

  const perfume1Name = data.inputPerfumes[0]?.name || '향수 1';
  const perfume2Name = data.inputPerfumes[1]?.name || '향수 2';

  const { score, summary, bestFor, color, title, reasons, warnings, scoreBreakdown, decision } =
    data.recommendation;
  const { matrix, structure, balance } = scoreBreakdown;

  const getDecisionInfo = (dec: string) => {
    switch (dec) {
      case 'RECOMMENDED':
        return { text: '추천', className: 'badge-recommended' };
      case 'TRY_IF_YOU_LIKE_THIS_MOOD':
        return { text: '취향에 따라 시도', className: 'badge-try' };
      case 'NOT_RECOMMENDED':
        return { text: '비추천', className: 'badge-not' };
      default:
        return { text: '', className: '' };
    }
  };

  const decisionInfo = getDecisionInfo(decision);

  return (
    <div className="modal-overlay">
      <div className="modal-card" ref={cardRef}>
        <button
          className="close-btn"
          ref={closeButtonREF}
          onClick={onClose}
          aria-label="닫기"
          autoFocus
        >
          <FiX size={20} />
        </button>

        <div className="modal-content">
          <div className="top-frame">
            <div className="aura-wrapper">
              <div className="aura-glow" style={{ backgroundColor: color.hex }}></div>
            </div>

            <div className="header-section">
              <span className="modal-subtitle">향수 레이어링 결과</span>
              <h3 className="modal-perfume-name">{perfume1Name}</h3>
              <div className="divider-wrapper">
                <div className="divider-line"></div>
                <span className="divider-x">X</span>
                <div className="divider-line"></div>
              </div>
              <h3 className="modal-perfume-name">{perfume2Name}</h3>
            </div>
          </div>

          <div className="bottom-frame">
            <div className="desc-section">
              <h4 className="desc-title">"{title}"</h4>
              <p className="desc-text">{summary}</p>
            </div>

            <hr className="section-divider" />

            <div className="score-section">
              <div className="score-header">
                <div className="grid-cell-label left">
                  <span className="meta-label" style={{ marginBottom: 0 }}>
                    적합도
                  </span>
                  {decisionInfo.text && (
                    <span className={`decision-badge ${decisionInfo.className}`}>
                      {decisionInfo.text}
                    </span>
                  )}
                </div>

                <div className="grid-cell-label right">
                  <span className="meta-label" style={{ marginBottom: 0 }}>
                    추천 계절
                  </span>
                </div>

                <div className="grid-cell-data left">
                  <span className="score-number">{score}</span>
                  <span className="score-percent">%</span>
                </div>

                <div className="grid-cell-data right">
                  {bestFor.map((season, idx) => (
                    <span key={idx} className="season-tag">
                      {season}
                    </span>
                  ))}
                </div>
              </div>

              <div className="breakdown-box">
                <div className="breakdown-row">
                  <span className="breakdown-label">어코드 조화</span>
                  <div className="breakdown-track">
                    <div
                      className="breakdown-fill bg-dark"
                      style={{ width: `${Math.min(matrix, 100)}%` }}
                    ></div>
                  </div>
                  <span className="breakdown-value">{matrix}</span>
                </div>
                <div className="breakdown-row">
                  <span className="breakdown-label">노트 구조</span>
                  <div className="breakdown-track">
                    <div
                      className="breakdown-fill bg-mid"
                      style={{ width: `${Math.min(structure, 100)}%` }}
                    ></div>
                  </div>
                  <span className="breakdown-value">{structure}</span>
                </div>
                <div className="breakdown-row">
                  <span className="breakdown-label">비율 밸런스</span>
                  <div className="breakdown-track">
                    <div
                      className="breakdown-fill bg-light"
                      style={{ width: `${Math.min(balance, 100)}%` }}
                    ></div>
                  </div>
                  <span className="breakdown-value">{balance}</span>
                </div>
              </div>
            </div>

            <div className="feedback-section">
              {reasons.map((reason, idx) => (
                <div key={`reason-${idx}`} className="feedback-item">
                  <FiCheck className="feedback-icon good" />
                  <div className="feedback-text-box">
                    <span className="feedback-title">추천 포인트</span>
                    <p className="feedback-desc">{reason}</p>
                  </div>
                </div>
              ))}

              {warnings.map((warning, idx) => (
                <div key={`warning-${idx}`} className="feedback-item">
                  <FiAlertCircle className="feedback-icon caution" />
                  <div className="feedback-text-box">
                    <span className="feedback-title">주의할 점</span>
                    <p className="feedback-desc">{warning}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="color-footer-section">
              <div className="color-info-header">
                <span className="meta-label" style={{ marginBottom: 0 }}>
                  예상 무드 컬러
                </span>
                <div className="color-info">
                  <span className="color-hex">{color.hex}</span>
                  <div className="color-circle" style={{ backgroundColor: color.hex }}></div>
                </div>
              </div>
              <p className="color-desc">
                "{color.name}: {color.description}"
              </p>

              <button className="save-btn" ref={buttonRef} onClick={handleDownloadImage}>
                <FiDownload size={18} />
                결과 저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
