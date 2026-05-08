import { Routes, Route } from 'react-router-dom';
import Header from '@widgets/Header/ui/Header';
import MainPage from '@pages/main/MainPage';
import PerfumeDetailPage from '@pages/perfume-detail/ui/PerfumeDetailPage';
import LayeringPage from '@pages/Layering/LayeringPage';
import LoginPage from '@pages/login/LoginPage';
import SignupPage from '@pages/signup/SignupPage';
import OAuthSuccessPage from '@pages/oauth2/OAuthSuccessPage';
import OAuthFailurePage from '@pages/oauth2/OAuthFailurePage';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/perfume/:id" element={<PerfumeDetailPage />} />
        <Route path="/layering" element={<LayeringPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/oauth2/success" element={<OAuthSuccessPage />} />
        <Route path="/oauth2/failure" element={<OAuthFailurePage />} />
      </Routes>
    </>
  );
}
