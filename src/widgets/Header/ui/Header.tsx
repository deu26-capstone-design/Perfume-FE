import '../styles/Header.css';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const isLogin = false;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <h1 className="header__logo">The Scent Lab</h1>

      {/* Desktop, Tablet nav */}
      <nav className="header__nav">
        <Link className="header__nav-item" to="/perfumes">
          향수
        </Link>
        <Link className="header__nav-item" to="/fragrance-types">
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
            <button className="header__auth-btn header__auth-btn--profile">
              <CgProfile color="var(--header-auth)" />
            </button>
          </>
        ) : (
          <button className="header__auth-btn">로그인</button>
        )}
      </div>

      {/* Mobile 햄버거 */}
      <button className="header__hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose /> : <GiHamburgerMenu />}
      </button>

      {/* Mobile 드롭다운 메뉴 */}
      {isOpen && (
        <nav className="header__nav--mobile">
          <Link className="header__nav-item" to="/perfumes" onClick={() => setIsOpen(false)}>
            향수
          </Link>
          <Link className="header__nav-item" to="/fragrance-types" onClick={() => setIsOpen(false)}>
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
                <button className="header__auth-btn header__auth-btn--profile">
                  <CgProfile size={15} color="var(--header-auth)" />
                </button>
              </>
            ) : (
              <button className="header__auth-btn">로그인</button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
