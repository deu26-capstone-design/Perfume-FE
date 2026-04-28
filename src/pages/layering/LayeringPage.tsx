// src/pages/layering/LayeringPage.tsx
import React, { useState } from 'react';
import { SearchInput } from '@features/perfume-search/ui/SearchInput';

const LayeringPage = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div
      className="layering-page-container"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--layering-mix-background)',
        padding: '80px 20px', // 상단 여백을 충분히 주어 시원하게 배치
      }}
    >
      {/* 이제 다른 스타일 설정 없이 한 줄로 호출해도 
        컴포넌트가 스스로 'main'에 맞는 너비(700px)와 중앙 정렬을 유지합니다. 
      */}
      <SearchInput variant="main" value={searchValue} onChange={setSearchValue} />
    </div>
  );
};

export default LayeringPage;
