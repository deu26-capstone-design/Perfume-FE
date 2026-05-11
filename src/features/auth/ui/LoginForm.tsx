import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './LoginForm.css';
import googleLogo from '@shared/assets/google_logo.png';
import naverLogo from '@shared/assets/naver_logo.png';
import { login, startGoogleLogin, startNaverLogin } from '@features/auth/model/authApi';
import { useAuth } from '@features/auth/model/useAuth';

const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setIsLogin } = useAuth();
  const redirectTo = searchParams.get('redirect') ?? '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      await login({ email, password });
      setIsLogin(true);
      navigate(redirectTo);
    } catch {
      setError('아이디 또는 비밀번호가 올바르지 않아요.');
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">로그인</h1>
      <p className="login__subtitle">로그인을 해주세요.</p>

      <div className="login__fields">
        <input
          className={`login__input ${email ? 'login__input--filled' : ''}`}
          type="text"
          placeholder="아이디를 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={`login__input ${password ? 'login__input--filled' : ''}`}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="login__error">{error}</p>}

      <button className="login__btn" onClick={handleLogin}>
        로그인
      </button>

      <div className="login__divider">
        <span className="login__divider-line" />
        <span className="login__divider-text">or continue with</span>
        <span className="login__divider-line" />
      </div>

      <div className="login__social">
        <button
          className="login__social-btn"
          onClick={() => {
            sessionStorage.setItem('oauth_redirect', redirectTo);
            startGoogleLogin();
          }}
        >
          <img src={googleLogo} alt="Google" className="login__social-logo" />
          Google로 계속하기
        </button>
        <button
          className="login__social-btn"
          onClick={() => {
            sessionStorage.setItem('oauth_redirect', redirectTo);
            startNaverLogin();
          }}
        >
          <img src={naverLogo} alt="Naver" className="login__social-logo" />
          Naver로 계속하기
        </button>
      </div>

      <div className="login__bottom">
        <button className="login__signup" onClick={() => navigate('/signup')}>
          회원가입
        </button>
        <button className="login__find" onClick={() => navigate('/find-account')}>
          아이디/비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
