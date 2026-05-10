import '../styles/Header.css';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getMe, logout, refreshCsrfToken } from '@features/auth/model/authApi';

const AUTH_HIDDEN_PATHS = ['/login', '/signup'];

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hideAuth = AUTH_HIDDEN_PATHS.includes(location.pathname);

  useEffect(() => {
    getMe()
      .then(() => {
        setIsLogin(true);
        refreshCsrfToken().catch(() => {});
      })
      .catch(() => setIsLogin(false));
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // 서버 응답 형식 무관하게 로컬 상태 초기화
    }
    setIsLogin(false);
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <span>The Scent Lab</span>
      </Link>

      {!hideAuth && (
        <>
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
                <button className="header__auth-btn" onClick={handleLogout}>
                  로그아웃
                </button>
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

          {/* Mobile 오버레이 */}
          {isOpen && <div className="header__overlay" onClick={() => setIsOpen(false)} />}

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
                    <button className="header__auth-btn" onClick={handleLogout}>
                      로그아웃
                    </button>
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
        </>
      )}
    </header>
  );
}
