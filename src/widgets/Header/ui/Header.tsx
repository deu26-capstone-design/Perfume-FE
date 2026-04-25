import '../styles/Header.css';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';

export default function Header() {
  const isLogin = true;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <h1 className="header__brand">The Scent Lab</h1>

      {/* 데스크탑 + 태블릿 nav */}
      <nav className="header__nav">
        <a className="header__nav-item">향수</a>
        <a className="header__nav-item">향 계열</a>
        <a className="header__nav-item">레이어링</a>
        <a className="header__nav-item">서비스 소개</a>
      </nav>

      {/* 데스크탑 + 태블릿 로그인 영역 */}
      <div className="header__auth">
        {isLogin ? (
          <>
            <button className="header__auth-btn">로그아웃</button>
            <button className="header__auth-btn header__auth-btn--profile">
              <CgProfile size={25} color="var(--header-auth)" />
            </button>
          </>
        ) : (
          <button className="header__auth-btn">로그인</button>
        )}
      </div>

      {/* 모바일 햄버거 버튼 */}
      <button className="header__hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose size={18} /> : <GiHamburgerMenu size={18} />}
      </button>

      {/* 모바일 드롭다운 메뉴 */}
      {isOpen && (
        <nav className="header__nav--mobile">
          <a className="header__nav-item" onClick={() => setIsOpen(false)}>
            향수
          </a>
          <a className="header__nav-item" onClick={() => setIsOpen(false)}>
            향 계열
          </a>
          <a className="header__nav-item" onClick={() => setIsOpen(false)}>
            레이어링
          </a>
          <a className="header__nav-item" onClick={() => setIsOpen(false)}>
            서비스 소개
          </a>
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
