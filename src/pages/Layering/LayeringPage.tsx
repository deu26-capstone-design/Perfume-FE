import { useState } from 'react';
import PerfumeGrid from '@widgets/perfume-grid/ui/PerfumeGrid';
import LayeringButton from '@features/layering-mix/ui/LayeringButton';
import type { Perfume } from '@entities/perfume/model/types';
import { useDebounce } from '@shared/lib/useDebounce';
import { INITIAL_SLOT_STATE, type SlotKey, type SlotState } from './model/layeringTypes';
import { useLayeringPerfumes } from './hooks/useLayeringPerfumes';
import { LayeringSelectionSection } from './ui/LayeringSelectionSection';
import './LayeringPage.css';

const LayeringPage = () => {
  const [activeSlot, setActiveSlot] = useState<SlotKey>('first');
  const [isTouched, setIsTouched] = useState(false);

  // 왼쪽/오른쪽 슬롯 상태
  const [slots, setSlots] = useState<Record<SlotKey, SlotState>>({
    first: INITIAL_SLOT_STATE,
    second: INITIAL_SLOT_STATE,
  });

  const currentSlot = slots[activeSlot];
  const debouncedSearch = useDebounce(currentSlot.search, 300);

  const { perfumes, hasNext, isLoading, fetchError, sentinelRef } = useLayeringPerfumes({
    keyword: debouncedSearch,
    accords: currentSlot.accords,
  });

  const firstPerfume = slots.first.perfume;
  const secondPerfume = slots.second.perfume;

  const isBothBright =
    (!isTouched && !firstPerfume && !secondPerfume) ||
    (Boolean(firstPerfume) && Boolean(secondPerfume));

  const updateSlot = (slot: SlotKey, updates: Partial<SlotState>) => {
    setSlots((prev) => ({
      ...prev,

      [slot]: {
        ...prev[slot],
        ...updates,
      },
    }));
  };

  const toggleAccord = (slot: SlotKey, accord: string) => {
    const accords = slots[slot].accords;

    updateSlot(slot, {
      accords: accords.includes(accord)
        ? accords.filter((v) => v !== accord)
        : [...accords, accord],
    });
  };

  const resetSlot = (slot: SlotKey) => {
    updateSlot(slot, INITIAL_SLOT_STATE);

    setActiveSlot(slot);
  };

  const handleSelectPerfume = (slot: SlotKey, perfume: Perfume) => {
    if (firstPerfume && secondPerfume) {
      // alert는 나중에 toast로 변경 예정
      alert('향수 2개를 모두 선택하셨습니다. 초기화 버튼을 눌러주세요.');

      return;
    }

    updateSlot(slot, {
      perfume,
      accords: [],
      search: '',
    });

    if (slot === 'first' && !secondPerfume) {
      setActiveSlot('second');
    }
    if (slot === 'second' && !firstPerfume) {
      setActiveSlot('first');
    }
  };

  // 이미 선택된 향수 제외
  const filteredPerfumes = perfumes.filter(
    (perfume) => perfume.id !== firstPerfume?.id && perfume.id !== secondPerfume?.id,
  );

  const handleLayeringMix = () => {
    // TODO:
    // 레이어링 결과 연결
  };

  return (
    <div className="layering-page">
      <div className="layering-text-frame">
        <h1 className="layering-title">향수 레이어링</h1>

        <p className="layering-description">레이어링 하고 싶은 향수 2개를 선택해주세요</p>
      </div>

      <main className="layering-content">
        <section className="selection-frame">
          {(['first', 'second'] as SlotKey[]).map((slot) => (
            <LayeringSelectionSection
              key={slot}
              slot={slot}
              slotState={slots[slot]}
              activeSlot={activeSlot}
              isBothBright={isBothBright}
              onActivate={(slot) => {
                setIsTouched(true);

                setActiveSlot(slot);
              }}
              onSelectPerfume={handleSelectPerfume}
              onToggleAccord={toggleAccord}
              onReset={resetSlot}
              onSearchChange={(slot, search) =>
                updateSlot(slot, {
                  search,
                })
              }
            />
          ))}
        </section>

        <section className="button-frame">
          {firstPerfume && secondPerfume && <LayeringButton onClick={handleLayeringMix} />}
        </section>

        <section className="grid-frame">
          {fetchError ? (
            <p className="layering-page__empty">향수 정보를 불러오지 못했어요.</p>
          ) : isLoading && perfumes.length === 0 ? (
            <p className="layering-page__loading">향수를 불러오는 중...</p>
          ) : perfumes.length === 0 ? (
            <p className="layering-page__empty">해당 조건에 맞는 향수가 없어요!</p>
          ) : (
            <PerfumeGrid
              perfumes={filteredPerfumes}
              selectedCategories={currentSlot.accords}
              onRemoveCategory={(accord) => toggleAccord(activeSlot, accord)}
              onSelectPerfume={(perfume) => handleSelectPerfume(activeSlot, perfume)}
              variant="layering"
            />
          )}

          {hasNext && !fetchError && (
            <div
              ref={sentinelRef}
              style={{
                width: '100%',
                height: '20px',
              }}
            />
          )}

          {isLoading && perfumes.length > 0 && (
            <p className="layering-page__loading">불러오는 중...</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default LayeringPage;
