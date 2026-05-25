import { useState, useEffect } from 'react';
import MyTabSection from '@widgets/my-tab-section/MyTabSection';
import UserInfo from '@widgets/UserInfo/UserInfo';
import WishlistCarousel from '@widgets/wishlist-carousel/WishlistCarousel';
import PreferenceGraph from '@widgets/preference-graph/PreferenceGraph';
import MyReviewList from '@widgets/my-reviews/MyReviewList';
import { getMe } from '@features/auth/model/authApi';
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

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [user, setUser] = useState<UserProfile | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await getMe();
      const data = response.data;

      const mappedData: UserProfile = {
        profileImage: 'https://i.pinimg.com/736x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg',
        nickname: data.nickname,
        email: data.email,
        name: data.name,
        gender: data.gender,
        birthdate: data.birthDate,
        phone: data.phoneNumber,
      };

      setUser(mappedData);
    } catch (error) {
      console.error('데이터를 불러오지 못했습니다.', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) return <div className="loading">데이터를 불러오는 중...</div>;

  return (
    <div className="mypage-container">
      <div className="mypage-layout">
        <MyTabSection user={user} activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="main-content">
          {activeTab === 'profile' && <UserInfo userData={user} onUpdateSuccess={fetchUserData} />}

          {activeTab === 'tastes' && (
            <div className="tastes-content">
              <WishlistCarousel />
              <PreferenceGraph
                accords={
                  [
                    // { accordName: 'Floral', ratio: 100 },
                    // { accordName: 'Earthy', ratio: 70 },
                    // { accordName: 'Woody', ratio: 50 },
                    // { accordName: 'Gourmand', ratio: 80 },
                  ]
                }
              />
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
}
