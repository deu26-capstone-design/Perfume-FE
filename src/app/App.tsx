import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '@widgets/Header/ui/Header';
import { AuthProvider } from '@features/auth/model/useAuth';
import MainPage from '@pages/main/MainPage';
import PerfumeDetailPage from '@pages/perfume-detail/ui/PerfumeDetailPage';
import AccordsPage from '@pages/fragrance-accords/FragranceAccordsPage';
import LayeringPage from '@pages/Layering/LayeringPage';
import MyPage from '@pages/my/MyPage';
import LoginPage from '@pages/login/LoginPage';
import SignupPage from '@pages/signup/SignupPage';
import OAuthSuccessPage from '@pages/oauth2/OAuthSuccessPage';
import OAuthFailurePage from '@pages/oauth2/OAuthFailurePage';

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/perfume/:id" element={<PerfumeDetailPage />} />
        <Route path="/accords" element={<Navigate to="/accords/1" replace />} />
        <Route path="/accords/:accordId" element={<AccordsPage />} />
        <Route path="/layering" element={<LayeringPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/oauth2/success" element={<OAuthSuccessPage />} />
        <Route path="/oauth2/failure" element={<OAuthFailurePage />} />
      </Routes>
    </AuthProvider>
  );
}
