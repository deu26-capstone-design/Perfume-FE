import { MdEdit } from 'react-icons/md';
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
  return (
    <aside className="tab-section">
      <div className="profile-header-area">
        <div className="user-info-box">
          <div className="profile-image-wrapper">
            <div className="profile-image">
              <img src={user.profileImage} alt="프로필" />
            </div>
            <button className="edit-img-btn" aria-label="프로필 수정">
              <MdEdit />
            </button>
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
