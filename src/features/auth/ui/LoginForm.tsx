import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import googleLogo from '@shared/assets/google_logo.png';
import naverLogo from '@shared/assets/naver_logo.png';

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <h1 className="login__title">로그인</h1>
      <p className="login__subtitle">로그인을 해주세요.</p>

      <div className="login__fields">
        <input className="login__input" type="text" placeholder="아이디를 입력해주세요." />
        <input className="login__input" type="password" placeholder="비밀번호를 입력해주세요." />
      </div>

      <button className="login__btn">로그인</button>

      <div className="login__divider">
        <span className="login__divider-line" />
        <span className="login__divider-text">or continue with</span>
        <span className="login__divider-line" />
      </div>

      <div className="login__social">
        <button className="login__social-btn">
          <img src={googleLogo} alt="Google" className="login__social-logo" />
          Google로 계속하기
        </button>
        <button className="login__social-btn">
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
