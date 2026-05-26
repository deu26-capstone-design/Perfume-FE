import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScentTest } from '@features/scent-test/model/useScentTest';
import { useAuth } from '@features/auth/model/useAuth';
import ProgressBar from '@features/scent-test/ui/ProgressBar';
import QuestionCard from '@features/scent-test/ui/QuestionCard';
import './ScentTestPage.css';
import '@features/scent-test/ui/ProgressBar.css';
import '@features/scent-test/ui/QuestionCard.css';

const ScentTestPage = () => {
  const navigate = useNavigate();
  const { isLogin, isAuthLoading } = useAuth();
  const {
    currentQuestion,
    currentIndex,
    totalCount,
    answers,
    isComplete,
    isTestLoading,
    isSubmitting,
    selectAnswer,
    goBack,
  } = useScentTest();
  const [isStarted, setIsStarted] = useState(false);
  const wasLoggedIn = useRef(false);

  useEffect(() => {
    if (isLogin) wasLoggedIn.current = true;
  }, [isLogin]);

  useEffect(() => {
    if (!isAuthLoading && !isLogin) {
      navigate(wasLoggedIn.current ? '/' : '/login?redirect=/scent-test', { replace: true });
    }
  }, [isLogin, isAuthLoading, navigate]);

  if (isAuthLoading || !isLogin) return null;

  if (isTestLoading) {
    return (
      <div className="scent-test">
        <div className="scent-test__loading" />
      </div>
    );
  }

  if (!isStarted && !isComplete) {
    const hasProgress = Object.keys(answers).length > 0;
    return (
      <div className="scent-test">
        <div className="scent-test__container scent-test__intro">
          <div className="scent-test__intro-header">
            <p className="scent-test__intro-label">향 선호도 테스트</p>
            <h1 className="scent-test__intro-title">나에게 어울리는 향은 무엇일까요?</h1>
          </div>
          <p className="scent-test__intro-desc">
            간단한 질문들을 통해 당신이 어떤 향 계열을 좋아하는지 알아볼 수 있어요!
            <br />
            평소 좋아하는 분위기와 감각을 떠올리며 답해보세요.
          </p>
          <ul className="scent-test__intro-info">
            <li>
              <span className="scent-test__intro-info-icon">📋</span>
              <span>총 12문항 · 약 3분 소요</span>
            </li>
            <li>
              <span className="scent-test__intro-info-icon">💾</span>
              <span>중간에 나가도 진행 상태가 저장돼요</span>
            </li>
            <li>
              <span className="scent-test__intro-info-icon">⚠️</span>
              <span>테스트는 한 번만 응시할 수 있어요</span>
            </li>
          </ul>
          <button className="scent-test__btn" onClick={() => setIsStarted(true)}>
            {hasProgress ? '이어서 하기' : '테스트 시작하기'}
          </button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="scent-test">
        <div className="scent-test__container">
          <div className="scent-test__complete">
            <p className="scent-test__complete-title">테스트를 완료하셨습니다.</p>
            <p className="scent-test__complete-desc">
              테스트한 결과는 마이페이지의 '내 취향' 탭에서 확인하실 수 있으며,
              <br />
              추후 작성하시는 리뷰에 따라 선호도 결과가 업데이트됩니다.
            </p>
            <button className="scent-test__btn" onClick={() => navigate('/my-page/tastes')}>
              마이페이지에서 결과 확인하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scent-test">
      <div className="scent-test__container">
        <ProgressBar current={currentIndex + 1} total={totalCount} />
        <QuestionCard
          question={currentQuestion}
          selectedIndex={answers[currentQuestion.id] ?? null}
          onSelect={selectAnswer}
          disabled={isSubmitting}
        />
        {currentIndex > 0 && (
          <button className="scent-test__back" onClick={goBack}>
            이전 질문
          </button>
        )}
      </div>
    </div>
  );
};

export default ScentTestPage;
