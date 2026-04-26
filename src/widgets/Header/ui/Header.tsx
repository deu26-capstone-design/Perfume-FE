import '../styles/Header.css';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const isLogin = true;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <span>The Scent Lab</span>
      </Link>

      {/* Desktop, Tablet nav */}
      <nav className="header__nav">
        <Link className="header__nav-item" to="/">
          향수
        </Link>
        <Link className="header__nav-item" to="/accords">
          향 계열
        </Link>
        <Link className="header__nav-item" to="/layering">
          레이어링
        </Link>
        <Link className="header__nav-item" to="/services">
          서비스 소개
        </Link>
      </nav>

      {/* Desktop, Tablet 로그인 영역 */}
      <div className="header__auth">
        {isLogin ? (
          <>
            <button className="header__auth-btn">로그아웃</button>
            <Link to="/my-page" className="header__auth-btn header__auth-btn--profile">
              <CgProfile color="var(--header-auth)" />
            </Link>
          </>
        ) : (
          <Link to="/login" className="header__auth-btn">
            로그인
          </Link>
        )}
      </div>

      {/* Mobile 햄버거 */}
      <button className="header__hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose /> : <GiHamburgerMenu />}
      </button>

      {/* Mobile 드롭다운 메뉴 */}
      {isOpen && (
        <nav className="header__nav--mobile">
          <Link className="header__nav-item" to="/" onClick={() => setIsOpen(false)}>
            향수
          </Link>
          <Link className="header__nav-item" to="/accords" onClick={() => setIsOpen(false)}>
            향 계열
          </Link>
          <Link className="header__nav-item" to="/layering" onClick={() => setIsOpen(false)}>
            레이어링
          </Link>
          <Link className="header__nav-item" to="/services" onClick={() => setIsOpen(false)}>
            서비스 소개
          </Link>
          <div className="header__auth--mobile">
            {isLogin ? (
              <>
                <button className="header__auth-btn">로그아웃</button>
                <Link to="/my-page" className="header__auth-btn header__auth-btn--profile">
                  <CgProfile color="var(--header-auth)" />
                </Link>
              </>
            ) : (
              <Link to="/login" className="header__auth-btn">
                로그인
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
