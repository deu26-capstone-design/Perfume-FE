import Header from '@widgets/Header/ui/Header';

function App() {
  return <>{<Header />}</>;
}

export default App;

// import { useState, useEffect } from 'react';
// import { PerfumeCard } from '../entities/perfume/ui/card/PerfumeCard';
// import { mockPerfumes } from '../entities/perfume/model/mockData';
// import type { Perfume } from '../entities/perfume/model/types';

// export default function App() {
//   const [perfume, setPerfume] = useState<Perfume | null>(null);

//   useEffect(() => {
//     // API 연동 전까지 mock 데이터 사용. 연동 시 fetch 코드로 변경.
//     const fetchPerfume = () => {
//       const response = mockPerfumes[1]; //임시 데이터
//       setPerfume(response);
//     };

//     fetchPerfume();
//   }, []);

//   if (!perfume) return null;

//   return <PerfumeCard perfume={perfume} />;
// }
