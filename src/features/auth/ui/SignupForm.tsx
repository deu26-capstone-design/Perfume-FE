import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';
import { signup, login } from '@features/auth/model/authApi';
import { useAuth } from '@features/auth/model/useAuth';

const SignupForm = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [gender, setGender] = useState<'F' | 'M' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formatBirthDate = (value: string) => {
    if (value.length === 8) {
      return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
    }
    return value;
  };

  const handleSignup = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isLoading) return;
    setError('');
    if (!name.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }
    if (!email.trim()) {
      setError('이메일을 입력해주세요.');
      return;
    }
    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    if (!phoneNumber.trim()) {
      setError('휴대폰번호를 입력해주세요.');
      return;
    }
    if (!gender) {
      setError('성별을 선택해주세요.');
      return;
    }
    if (birthDate.length !== 8) {
      setError('생년월일을 8자리로 입력해주세요.');
      return;
    }
    if (password.length < 10) {
      setError('비밀번호는 10자 이상 입력해주세요.');
      return;
    }
    try {
      setIsLoading(true);
      await signup({
        email,
        password,
        name,
        nickname,
        gender,
        birthDate: formatBirthDate(birthDate),
        phoneNumber,
      });
      await login({ email, password });
      await refreshUser();
      setIsSuccess(true);
    } catch (err: unknown) {
      const data = (err as { response?: { data?: { detail?: string; message?: string } } })
        ?.response?.data;
      const message = data?.message ?? data?.detail ?? '';
      if (message.includes('email') && message.includes('exists')) {
        setError('이미 사용 중인 이메일이에요.');
      } else if (message.includes('nickname') && message.includes('exists')) {
        setError('이미 사용 중인 닉네임이에요.');
      } else {
        setError('회원가입에 실패했어요. 입력 정보를 확인해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="signup">
        <h1 className="signup__title">가입을 환영해요! 🎉</h1>
        <p className="signup__subtitle">
          간단한 테스트로 나만의 향 취향을 찾아보세요. <br />향 선호도 테스트는 언제든지
          마이페이지에서 다시 할 수 있어요.
        </p>
        <div className="signup__success-btns">
          <button type="button" className="signup__btn" onClick={() => navigate('/scent-test')}>
            향 선호도 테스트 시작하기
          </button>
          <button
            type="button"
            className="signup__btn signup__btn--secondary"
            onClick={() => navigate('/main')}
          >
            나중에 하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="signup" onSubmit={handleSignup}>
      <h1 className="signup__title">회원가입</h1>
      <p className="signup__subtitle">서비스 이용을 위해 정확한 정보를 입력해주세요.</p>

      <div className="signup__fields">
        <div className="signup__field">
          <span className="signup__label">이름</span>
          <input
            className={`signup__input ${name ? 'signup__input--filled' : ''}`}
            type="text"
            placeholder="ex. 홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="signup__field">
          <span className="signup__label">아이디(이메일)</span>
          <input
            className={`signup__input ${email ? 'signup__input--filled' : ''}`}
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="signup__field">
          <span className="signup__label">비밀번호</span>
          <div className="signup__input-wrap">
            <input
              className={`signup__input ${password ? 'signup__input--filled' : ''}`}
              type={showPassword ? 'text' : 'password'}
              placeholder="영문, 숫자 조합"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="signup__pw-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>
        </div>

        <div className="signup__row">
          <div className="signup__field">
            <span className="signup__label">생년월일(8자리)</span>
            <input
              className={`signup__input ${birthDate ? 'signup__input--filled' : ''}`}
              type="text"
              placeholder="YYYYMMDD"
              maxLength={8}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="signup__field">
            <span className="signup__label">닉네임</span>
            <input
              className={`signup__input ${nickname ? 'signup__input--filled' : ''}`}
              type="text"
              placeholder="사용할 닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>

        <div className="signup__field">
          <span className="signup__label">휴대폰번호(-없이 숫자만)</span>
          <input
            className={`signup__input ${phoneNumber ? 'signup__input--filled' : ''}`}
            type="tel"
            placeholder="01012345678"
            maxLength={11}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="signup__field">
          <span className="signup__label">성별</span>
          <div className="signup__gender">
            <button
              type="button"
              className={`signup__gender-btn ${gender === 'F' ? 'signup__gender-btn--active' : ''}`}
              onClick={() => setGender('F')}
            >
              여성
            </button>
            <button
              type="button"
              className={`signup__gender-btn ${gender === 'M' ? 'signup__gender-btn--active' : ''}`}
              onClick={() => setGender('M')}
            >
              남성
            </button>
          </div>
        </div>
      </div>

      {error && <p className="signup__error">{error}</p>}

      <button type="submit" className="signup__btn" disabled={isLoading}>
        {isLoading ? '처리 중...' : '회원가입 완료'}
      </button>
    </form>
  );
};

export default SignupForm;
