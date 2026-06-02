import { useState, useEffect, useRef } from 'react';
import { MdEdit, MdPhotoCamera, MdDelete } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { updateProfileImage } from '@features/auth/model/authApi';
import defaultProfileImg from '@shared/assets/default-profile.jpg';
import './MyTabSection.css';

const PROFILE_TOAST_ID = 'profile-update-toast';

interface MyTabSectionProps {
  user: {
    profileImage: string;
    nickname: string;
    email: string;
  };
  activeTab: string;
  onTabChange: (tab: 'profile' | 'tastes' | 'reviews') => void;
  onUpdateSuccess: () => void;
}

const MyTabSection: React.FC<MyTabSectionProps> = ({
  user,
  activeTab,
  onTabChange,
  onUpdateSuccess,
}) => {
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('프로필 이미지는 5MB 이하여야 합니다.', { id: PROFILE_TOAST_ID });
      e.target.value = '';
      return;
    }

    try {
      await updateProfileImage(file);
      toast.success('프로필 이미지가 성공적으로 변경되었습니다.', { id: PROFILE_TOAST_ID });
      onUpdateSuccess();
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
      toast.error('이미지 변경에 실패했습니다. 다시 시도해 주세요.', { id: PROFILE_TOAST_ID });
    } finally {
      e.target.value = '';
      setIsImgDropdownOpen(false);
    }
  };

  const handleDefaultImgClick = async () => {
    try {
      const response = await fetch(defaultProfileImg);
      const blob = await response.blob();
      const defaultFile = new File([blob], 'default-profile.jpg', { type: 'image/jpeg' });

      await updateProfileImage(defaultFile);

      toast.success('기본 이미지로 변경되었습니다.', { id: PROFILE_TOAST_ID });
      onUpdateSuccess();
    } catch (error) {
      console.error('기본 이미지 변경 실패:', error);
      toast.error('기본 이미지로 변경하는 데 실패했습니다. 다시 시도해 주세요.', {
        id: PROFILE_TOAST_ID,
      });
    } finally {
      setIsImgDropdownOpen(false);
    }
  };

  return (
    <aside className="tab-section">
      <Toaster
        position="top-center"
        containerStyle={{
          top: '100px',
        }}
        toastOptions={{
          duration: 2000,
          style: {
            background: 'var(--white-800)',
            borderRadius: '50px',
            padding: '16px 28px',
            maxWidth: 'none',
            whiteSpace: 'nowrap',
          },
        }}
      />

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
