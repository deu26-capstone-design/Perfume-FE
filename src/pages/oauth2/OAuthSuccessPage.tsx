import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { bootstrapAfterOAuth } from '@features/auth/model/authApi';
import { useAuth } from '@features/auth/model/useAuth';

const OAuthSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setIsLogin } = useAuth();
  const raw = searchParams.get('redirect') ?? sessionStorage.getItem('oauth_redirect') ?? '/';
  const redirectTo = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/';

  useEffect(() => {
    bootstrapAfterOAuth()
      .then((res) => {
        setIsLogin(true);
        sessionStorage.removeItem('oauth_redirect');
        if (!res.data?.profileCompleted) {
          navigate('/oauth2/complete-profile');
        } else {
          navigate(redirectTo);
        }
      })
      .catch(() => navigate('/login'));
  }, [navigate, setIsLogin, redirectTo]);

  return <p>로그인 처리 중...</p>;
};

export default OAuthSuccessPage;
