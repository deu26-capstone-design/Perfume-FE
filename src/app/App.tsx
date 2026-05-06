import { Routes, Route } from 'react-router-dom';
import Header from '@widgets/Header/ui/Header';
import MainPage from '@pages/main/MainPage';
import PerfumeDetailPage from '@pages/perfume-detail/ui/PerfumeDetailPage';
import LayeringPage from '@pages/Layering/LayeringPage';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/perfume/:id" element={<PerfumeDetailPage />} />
        <Route path="/layering" element={<LayeringPage />} />
      </Routes>
    </>
  );
}
