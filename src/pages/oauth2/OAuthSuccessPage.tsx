import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bootstrapAfterOAuth } from '@features/auth/model/authApi';

const OAuthSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    bootstrapAfterOAuth()
      .then((res) => {
        if (!res.data?.profileCompleted) {
          navigate('/oauth2/complete-profile');
        } else {
          navigate('/');
        }
      })
      .catch(() => navigate('/login'));
  }, [navigate]);

  return <p>로그인 처리 중...</p>;
};

export default OAuthSuccessPage;
