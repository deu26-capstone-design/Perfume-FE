import { useEffect } from 'react';
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

  useEffect(() => {
    if (!isAuthLoading && !isLogin) {
      navigate('/login?redirect=/scent-test', { replace: true });
    }
  }, [isLogin, isAuthLoading, navigate]);

  if (isAuthLoading || !isLogin) return null;
  const {
    currentQuestion,
    currentIndex,
    totalCount,
    answers,
    isComplete,
    selectAnswer,
    goBack,
  } = useScentTest();

  if (isComplete) {
    return (
      <div className="scent-test">
        <div className="scent-test__container">
          <div className="scent-test__complete">
            <p className="scent-test__complete-title">테스트를 완료하셨습니다.</p>
            <p className="scent-test__complete-desc">
              테스트한 결과는 마이페이지의 '내 취향' 탭에서 확인하실 수 있으며,
              <br />
              추후 작성하시는 리뷰에 따라 결과가 바뀔 예정입니다.
            </p>
            <button className="scent-test__btn" onClick={() => navigate('/my-page')}>
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
