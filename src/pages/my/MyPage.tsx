import { useState, useEffect } from 'react';
import MyTabSection from '@widgets/my-tab-section/MyTabSection';
import UserInfo from '@widgets/UserInfo/UserInfo';
import WishlistCarousel from '@widgets/wishlist-carousel/WishlistCarousel';
import MyReviewList from '@widgets/my-reviews/MyReviewList';
import './MyPage.css';

interface UserProfile {
  profileImage: string;
  nickname: string;
  email: string;
  name: string;
  gender: string;
  birthdate: string;
  phone: string;
}

type TabType = 'profile' | 'tastes' | 'reviews';

const MyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const mockData: UserProfile = {
          profileImage: 'https://i.pinimg.com/736x/e9/c6/92/e9c692d5adaef54de0fc98e829cc1e13.jpg',
          nickname: '향수콜렉터',
          email: 'aaa@naver.com',
          name: '김철수',
          gender: 'male',
          birthdate: '2003-05-20',
          phone: '010-1234-5678',
        };

        setUser(mockData);
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다.', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) return <div className="loading">데이터를 불러오는 중...</div>;

  return (
    <div className="mypage-container">
      <div className="mypage-layout">
        <MyTabSection user={user} activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="main-content">
          {activeTab === 'profile' && <UserInfo userData={user} />}
          {activeTab === 'tastes' && (
            <div className="tastes-content">
              <WishlistCarousel />
            </div>
          )}
          {activeTab === 'reviews' && (
            <section className="reviews-section">
              <div className="section-header"></div>
              <MyReviewList />
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyPage;
