import { useState, useEffect } from 'react';
import MyTabSection from '@widgets/my-tab-section/MyTabSection';
import UserInfo from '@widgets/UserInfo/UserInfo';
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
          {activeTab === 'tastes' && <div>내취향 콘텐츠</div>}
          {activeTab === 'reviews' && <div>리뷰관리 콘텐츠</div>}
        </main>
      </div>
    </div>
  );
};

export default MyPage;
