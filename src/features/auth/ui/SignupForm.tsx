import { useState } from 'react';
import './SignupForm.css';

const SignupForm = () => {
  const [gender, setGender] = useState<'female' | 'male' | null>(null);

  return (
    <div className="signup">
      <h1 className="signup__title">회원가입</h1>
      <p className="signup__subtitle">서비스 이용을 위해 정확한 정보를 입력해주세요.</p>

      <div className="signup__fields">
        <div className="signup__field">
          <span className="signup__label">이름</span>
          <input className="signup__input" type="text" placeholder="ex. 홍길동" />
        </div>

        <div className="signup__field">
          <span className="signup__label">아이디(이메일)</span>
          <input className="signup__input" type="email" placeholder="example@email.com" />
        </div>

        <div className="signup__field">
          <span className="signup__label">비밀번호</span>
          <input className="signup__input" type="password" placeholder="영문, 숫자 조합" />
        </div>

        <div className="signup__row">
          <div className="signup__field">
            <span className="signup__label">생년월일(8자리)</span>
            <input className="signup__input" type="text" placeholder="YYYYMMDD" maxLength={8} />
          </div>
          <div className="signup__field">
            <span className="signup__label">닉네임</span>
            <input className="signup__input" type="text" placeholder="사용할 닉네임" />
          </div>
        </div>

        <div className="signup__field">
          <span className="signup__label">휴대폰번호(-없이 숫자만)</span>
          <input className="signup__input" type="tel" placeholder="01012345678" maxLength={11} />
        </div>

        <div className="signup__field">
          <span className="signup__label">성별</span>
          <div className="signup__gender">
            <button
              className={`signup__gender-btn ${gender === 'female' ? 'signup__gender-btn--active' : ''}`}
              onClick={() => setGender('female')}
            >
              여성
            </button>
            <button
              className={`signup__gender-btn ${gender === 'male' ? 'signup__gender-btn--active' : ''}`}
              onClick={() => setGender('male')}
            >
              남성
            </button>
          </div>
        </div>
      </div>

      <button className="signup__btn">회원가입 완료</button>
    </div>
  );
};

export default SignupForm;
