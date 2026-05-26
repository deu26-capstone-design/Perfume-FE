import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { accordColors } from '@entities/perfume/model/accordColors';
import { getPreferenceTop5, getTestProgress } from '@features/preference/api/perferenceApi';
import './PreferenceGraph.css';

const DEFAULT_ACCORD_COLOR = '#cccccc';

export default function PreferenceGraph() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [top5Accords, setTop5Accords] = useState<{ scentName: string; score: number }[]>([]);
  const [hasInProgress, setHasInProgress] = useState(false);

  useEffect(() => {
    const fetchPreferenceData = async () => {
      try {
        const top5Data = await getPreferenceTop5();

        setTestCompleted(top5Data.testCompleted);
        setTop5Accords(top5Data.top5 || []);

        if (!top5Data.testCompleted) {
          const progressData = await getTestProgress();

          const isProgressing =
            progressData.answers && Object.keys(progressData.answers).length > 0;
          setHasInProgress(isProgressing);
        }
      } catch (error) {
        console.error('선호도 데이터를 불러오는데 실패했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferenceData();
  }, []);

  if (isLoading) {
    return <div className="preference-section">결과를 불러오는 중입니다...</div>;
  }

  const maxScore = top5Accords.length > 0 ? top5Accords[0].score : 1;

  return (
    <div className="preference-section">
      <h2 className="preference-title">선호하는 향 계열</h2>

      {testCompleted ? (
        <div className="preference-graph">
          {top5Accords.map((accord) => {
            const relativeWidth = (accord.score / maxScore) * 100;

            return (
              <div key={accord.scentName} className="preference-accord">
                <span className="preference-accord-name">{accord.scentName}</span>
                <div className="preference-accord-bar-wrap">
                  <div
                    className="preference-accord-bar"
                    style={{
                      width: `${relativeWidth}%`,
                      backgroundColor: accordColors[accord.scentName] ?? DEFAULT_ACCORD_COLOR,
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
            {hasInProgress ? '진행 중인 테스트가 있습니다.' : '향 선호도 테스트 결과가 없습니다.'}
            <br />
            {hasInProgress ? '테스트를 이어서 진행하시겠습니까?' : '테스트를 하러 가시겠습니까?'}
          </p>
          <button type="button" className="go-test-btn" onClick={() => navigate('/scent-test')}>
            {hasInProgress ? '테스트 이어서하기' : '테스트 하러가기'}
          </button>
        </div>
      )}
    </div>
  );
}
