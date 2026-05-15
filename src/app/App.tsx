import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '@widgets/Header/ui/Header';
import { AuthProvider } from '@features/auth/model/useAuth';
import ScrollToTop from '@app/router/ScrollToTop';
import MainPage from '@pages/main/MainPage';
import PerfumeDetailPage from '@pages/perfume-detail/ui/PerfumeDetailPage';
import AccordsPage from '@pages/fragrance-accords/FragranceAccordsPage';
import LayeringPage from '@pages/Layering/LayeringPage';
import MyPage from '@pages/my/MyPage';
import LoginPage from '@pages/login/LoginPage';
import SignupPage from '@pages/signup/SignupPage';
import OAuthSuccessPage from '@pages/oauth2/OAuthSuccessPage';
import OAuthFailurePage from '@pages/oauth2/OAuthFailurePage';
import ScentTestPage from '@pages/scent-test/ScentTestPage';
import ServicesPage from '@pages/services/ServicesPage';

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<ServicesPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/perfume/:id" element={<PerfumeDetailPage />} />
        <Route path="/accords" element={<AccordsPage />} />
        <Route path="/accords/:accordId" element={<AccordsPage />} />
        <Route path="/layering" element={<LayeringPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/oauth2/success" element={<OAuthSuccessPage />} />
        <Route path="/oauth2/failure" element={<OAuthFailurePage />} />
        <Route path="/scent-test" element={<ScentTestPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
