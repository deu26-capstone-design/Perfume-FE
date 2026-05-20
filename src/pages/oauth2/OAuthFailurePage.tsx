import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthFailurePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div style={{ padding: '60px 40px', textAlign: 'center' }}>
      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        {error === 'oauth_login_failed'
          ? '소셜 로그인에 실패했어요.'
          : '로그인 중 문제가 발생했어요.'}
      </p>
      <button
        onClick={() => navigate('/login')}
        style={{ cursor: 'pointer', textDecoration: 'underline', fontSize: '14px' }}
      >
        로그인 페이지로 돌아가기
      </button>
    </div>
  );
};

export default OAuthFailurePage;
