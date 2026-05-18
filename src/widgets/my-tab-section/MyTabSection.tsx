import { useState, useEffect, useRef } from 'react';
import { MdEdit, MdPhotoCamera, MdDelete } from 'react-icons/md';
import './MyTabSection.css';

interface MyTabSectionProps {
  user: {
    profileImage: string;
    nickname: string;
    email: string;
  };
  activeTab: string;
  onTabChange: (tab: 'profile' | 'tastes' | 'reviews') => void;
}

const MyTabSection: React.FC<MyTabSectionProps> = ({ user, activeTab, onTabChange }) => {
  const [isImgDropdownOpen, setIsImgDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsImgDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
    setIsImgDropdownOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('선택된 파일:', file);
      // TODO: 백엔드로 파일 전송하는 API 호출
    }
  };

  const handleDefaultImgClick = () => {
    console.log('기본 이미지로 변경 요청');
    // TODO: 프로필 이미지를 기본값으로 되돌리는 API 호출
    setIsImgDropdownOpen(false);
  };

  return (
    <aside className="tab-section">
      <div className="profile-header-area">
        <div className="user-info-box">
          <div className="profile-image-wrapper" ref={dropdownRef}>
            <div className="profile-image">
              <img src={user.profileImage} alt="프로필" />
            </div>

            <button
              className="edit-img-btn"
              aria-label="프로필 이미지 수정"
              onClick={() => setIsImgDropdownOpen(!isImgDropdownOpen)}
            >
              <MdEdit />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {isImgDropdownOpen && (
              <div className="img-edit-dropdown">
                <button className="dropdown-item" onClick={handleUploadClick}>
                  <MdPhotoCamera className="dropdown-icon" />새 이미지 업로드
                </button>
                <button className="dropdown-item delete" onClick={handleDefaultImgClick}>
                  <MdDelete className="dropdown-icon" />
                  기본 이미지로 변경
                </button>
              </div>
            )}
          </div>

          <div className="user-text-info">
            <h2 className="nickname">{user.nickname}</h2>
            <p className="email">{user.email}</p>
          </div>
        </div>
      </div>

      <nav className="tab-menu">
        <button
          className={`tab-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => onTabChange('profile')}
        >
          내프로필
        </button>
        <button
          className={`tab-item ${activeTab === 'tastes' ? 'active' : ''}`}
          onClick={() => onTabChange('tastes')}
        >
          내취향
        </button>
        <button
          className={`tab-item ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => onTabChange('reviews')}
        >
          리뷰관리
        </button>
      </nav>
    </aside>
  );
};

export default MyTabSection;
