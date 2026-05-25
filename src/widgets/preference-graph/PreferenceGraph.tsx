import { useNavigate } from 'react-router-dom';
import { accordColors } from '@entities/perfume/model/accordColors';
import './PreferenceGraph.css';

const DEFAULT_ACCORD_COLOR = '#cccccc';

export interface AccordData {
  accordName: string;
  ratio: number;
}

interface AccordGraphProps {
  accords: AccordData[];
}

export default function PreferenceGraph({ accords }: AccordGraphProps) {
  const navigate = useNavigate();

  // 데이터(테스트 결과)가 존재하는지 확인하는 변수
  const hasResults = accords && accords.length > 0;
  // 1. 12개 계열 점수를 내림차순 정렬
  const sortedAccords = [...accords].sort((a, b) => b.ratio - a.ratio);
  // 2. 상위 5개 계열 추출
  const top5Accords = sortedAccords.slice(0, 5);
  // 3. 최고값(1위 점수) 추출 (데이터가 없을 경우 1로 처리)
  const maxRatio = top5Accords.length > 0 ? top5Accords[0].ratio : 1;

  return (
    <div className="preference-section">
      <h2 className="preference-title">선호하는 향 계열</h2>

      {hasResults ? (
        <div className="preference-graph">
          {top5Accords.map((accord) => {
            const relativeWidth = (accord.ratio / maxRatio) * 100;

            return (
              <div key={accord.accordName} className="preference-accord">
                <span className="preference-accord-name">{accord.accordName}</span>
                <div className="preference-accord-bar-wrap">
                  <div
                    className="preference-accord-bar"
                    style={{
                      width: `${relativeWidth}%`,
                      backgroundColor: accordColors[accord.accordName] ?? DEFAULT_ACCORD_COLOR,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="test-action-box">
          <p className="test-action-text">
            향 선호도 테스트 결과가 없습니다.
            <br />
            테스트를 하러 가시겠습니까?
          </p>
          <button type="button" className="go-test-btn" onClick={() => navigate('/perfume-test')}>
            테스트 하러가기
          </button>
        </div>
      )}
    </div>
  );
}
