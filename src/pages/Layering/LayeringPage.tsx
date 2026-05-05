import { useState } from 'react';
import { LayeringPerfumeSelection } from '@widgets/layering-perfume-selection/LayeringPerfumeSelection';
import PerfumeGrid from '@widgets/perfume-grid/ui/PerfumeGrid';
import LayeringButton from '@features/layering-mix/ui/LayeringButton';
import { mockPerfumes } from '@entities/perfume/model/mockData';
import type { Perfume } from '@entities/perfume/model/types';
import './LayeringPage.css';

const LayeringPage: React.FC = () => {
  const [activeSlot, setActiveSlot] = useState<'first' | 'second'>('first');
  const [isTouched, setIsTouched] = useState(false);

  const [firstPerfume, setFirstPerfume] = useState<Perfume | null>(null);
  const [secondPerfume, setSecondPerfume] = useState<Perfume | null>(null);

  const [firstCategories, setFirstCategories] = useState<string[]>([]);
  const [secondCategories, setSecondCategories] = useState<string[]>([]);

  const [firstSearch, setFirstSearch] = useState('');
  const [secondSearch, setSecondSearch] = useState('');

  // 현재 선택 중인 슬롯 기준으로 검색어/카테고리 동기화
  const currentSearch = activeSlot === 'first' ? firstSearch : secondSearch;
  const currentCategories = activeSlot === 'first' ? firstCategories : secondCategories;

  // 초기 상태 or 두 개 모두 선택된 경우 두 selection box 모두 활성화
  const isBothBright =
    (!isTouched && !firstPerfume && !secondPerfume) || (firstPerfume && secondPerfume);

  // 향수 리스트 필터링 (카테고리 + 검색어)
  const filteredPerfumes = mockPerfumes.filter((perfume) => {
    const perfumeScents = perfume.scent_type || [];

    // 선택된 모든 카테고리를 포함해야 함 (AND 조건)
    const matchesCategory =
      currentCategories.length === 0 ||
      currentCategories.every((category) => perfumeScents.includes(category));

    const keyword = currentSearch.toLowerCase();

    // 이름 또는 브랜드 기준 검색
    const matchesKeyword =
      !keyword ||
      perfume.name.toLowerCase().includes(keyword) ||
      perfume.brand.toLowerCase().includes(keyword);

    return matchesCategory && matchesKeyword;
  });

  // 그리드에서 향수 선택 시 처리 로직
  const handleSelectFromGrid = (perfume: Perfume) => {
    if (firstPerfume && secondPerfume) {
      // alert는 나중에 toast로 변경 예정
      alert('향수 2개를 모두 선택하셨습니다. 초기화 버튼을 눌러주세요.');
      return;
    }

    if (activeSlot === 'first') {
      setFirstPerfume(perfume);
      // 선택 후 검색어/카테고리 초기화
      setFirstSearch('');
      setFirstCategories([]);

      // 만약 두 번째 향수가 아직 선택되지 않았다면 자동으로 두 번째 슬롯으로 이동
      if (!secondPerfume) setActiveSlot('second');
    } else if (activeSlot === 'second') {
      setSecondPerfume(perfume);
      setSecondSearch('');
      setSecondCategories([]);

      if (!firstPerfume) setActiveSlot('first');
    }
  };

  const resetFirst = () => {
    setFirstPerfume(null);
    setFirstCategories([]);
    setFirstSearch('');
    setActiveSlot('first');
  };

  const resetSecond = () => {
    setSecondPerfume(null);
    setSecondCategories([]);
    setSecondSearch('');
    setActiveSlot('second');
  };

  const handleLayeringMix = () => {
    // TODO: 레이어링 결과 팝업/페이지 연동
  };

  return (
    <div className="layering-page">
      <div className="layering-text-frame">
        <h1 className="layering-title">향수 레이어링</h1>
        <p className="layering-description">레이어링 하고싶은 향수 2개를 선택해주세요</p>
      </div>
      <main className="layering-content">
        <section className="selection-frame">
          <div
            className={`selection-box ${isBothBright || activeSlot === 'first' ? 'is-active' : ''}`}
            onClick={() => {
              setIsTouched(true);
              setActiveSlot('first');
            }}
          >
            <LayeringPerfumeSelection
              selectedPerfume={firstPerfume}
              onSelectPerfume={(perfume) => setFirstPerfume(perfume)}
              selectedCategories={firstCategories}
              onUpdateCategory={(c) =>
                setFirstCategories((prev) =>
                  prev.includes(c) ? prev.filter((v) => v !== c) : [...prev, c],
                )
              }
              onReset={resetFirst}
              searchKeyword={firstSearch}
              onSearchChange={setFirstSearch}
            />
          </div>

          <div
            className={`selection-box ${isBothBright || activeSlot === 'second' ? 'is-active' : ''}`}
            onClick={() => {
              setIsTouched(true);
              setActiveSlot('second');
            }}
          >
            <LayeringPerfumeSelection
              selectedPerfume={secondPerfume}
              onSelectPerfume={(perfume) => setSecondPerfume(perfume)}
              selectedCategories={secondCategories}
              onUpdateCategory={(c) =>
                setSecondCategories((prev) =>
                  prev.includes(c) ? prev.filter((v) => v !== c) : [...prev, c],
                )
              }
              onReset={resetSecond}
              searchKeyword={secondSearch}
              onSearchChange={setSecondSearch}
            />
          </div>
        </section>

        <section className="button-frame">
          {firstPerfume && secondPerfume && <LayeringButton onClick={handleLayeringMix} />}
        </section>

        <section className="grid-frame">
          <PerfumeGrid
            perfumes={filteredPerfumes}
            selectedCategories={currentCategories}
            onRemoveCategory={(c) => {
              if (activeSlot === 'first') setFirstCategories((prev) => prev.filter((v) => v !== c));
              else setSecondCategories((prev) => prev.filter((v) => v !== c));
            }}
            onSelectPerfume={handleSelectFromGrid}
            variant="layering"
          />
        </section>
      </main>
    </div>
  );
};

export default LayeringPage;
