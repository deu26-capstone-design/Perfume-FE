import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
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
  const { tab } = useParams<{ tab: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const isValidTab = tab === 'profile' || tab === 'tastes' || tab === 'reviews';
  if (!isValidTab) {
    return <Navigate to="/my-page/profile" replace />;
  }

  if (isLoading) {
    return <div className="loading">데이터를 불러오는 중...</div>;
  }

  if (error) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '50px' }}>
        <h2>데이터를 불러오는데 실패했습니다.</h2>
        <p>일시적인 오류이거나 로그인이 만료되었을 수 있습니다.</p>
      </div>
    );
  }

  if (!user) return <div className="loading">데이터를 불러오는 중...</div>;

  return (
    <div className="mypage-container">
      <div className="mypage-layout">
        <MyTabSection
          user={user}
          activeTab={tab as TabType}
          onTabChange={(newTab) => navigate(`/my-page/${newTab}`)}
        />

        <main className="main-content">
          {tab === 'profile' && <UserInfo userData={user} onUpdateSuccess={fetchUserData} />}

          {tab === 'tastes' && (
            <div className="tastes-content">
              <WishlistCarousel />
              <PreferenceGraph />
            </div>
          )}

          {tab === 'reviews' && (
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
