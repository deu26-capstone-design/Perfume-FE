import { useState, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import PerfumeGrid from '@widgets/perfume-grid/ui/PerfumeGrid';
import LayeringButton from '@features/layering-mix/ui/LayeringButton';
import type { Perfume } from '@entities/perfume/model/types';
import { useDebounce } from '@shared/lib/useDebounce';
import { INITIAL_SLOT_STATE, type SlotKey, type SlotState } from './model/layeringTypes';
import { useLayeringPerfumes } from './hooks/useLayeringPerfumes';
import { LayeringSelectionSection } from './ui/LayeringSelectionSection';
import { LayeringResult } from '../layering-result/LayeringResult';
import { LayeringLoading } from '@widgets/layering-loading/LayeringLoading';
import { layeringToast } from './model/layeringToast';
import {
  getLayeringRecommendation,
  type LayeringRecommendationResponse,
} from '@entities/layering/api/layeringApi';
import './LayeringPage.css';

const LayeringPage = () => {
  const [activeSlot, setActiveSlot] = useState<SlotKey>('first');
  const [isTouched, setIsTouched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultData, setResultData] = useState<LayeringRecommendationResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const isCancelledRef = useRef<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

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
      layeringToast('이미 향수 2개를 선택했어요.\n초기화 후 다시 선택해주세요.', {
        id: 'max-perfume-toast',
      });
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

  const filteredPerfumes = perfumes.filter(
    (perfume) => perfume.id !== firstPerfume?.id && perfume.id !== secondPerfume?.id,
  );

  const handleLayeringMix = async () => {
    if (isGenerating || !firstPerfume || !secondPerfume) return;

    layeringToast.dismiss();
    setIsGenerating(true);
    isCancelledRef.current = false;

    const currentController = new AbortController();
    abortControllerRef.current = currentController;

    try {
      const response = await getLayeringRecommendation(
        { perfumeIds: [firstPerfume.id, secondPerfume.id] },
        abortControllerRef.current.signal,
      );

      if (!isCancelledRef.current) {
        setResultData(response);
        setIsModalOpen(true);
      }
    } catch (error: any) {
      if (error.name === 'AbortError' || error.name === 'CanceledError') {
        console.log('API 요청이 사용자에 의해 중단되었습니다.');
        return;
      }

      if (!isCancelledRef.current) {
        layeringToast(error.message || '레이어링 분석에 실패했습니다.');
      }
    } finally {
      if (abortControllerRef.current === currentController) {
        setIsGenerating(false);
        abortControllerRef.current = null;
      }
    }
  };

  const handleCancelGenerate = () => {
    const isConfirmed = window.confirm('결과 분석을 중단하고 이전 화면으로 돌아갈까요?');

    if (isConfirmed) {
      isCancelledRef.current = true;
      setIsGenerating(false);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      layeringToast.dismiss();
      layeringToast('분석이 중단되었습니다.', {
        id: 'cancel-generate-toast',
      });
    }
  };

  return (
    <div className="layering-page">
      <Toaster
        position="top-center"
        containerStyle={{
          top: '300px',
        }}
        toastOptions={{
          duration: 2000,
        }}
      />
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

      {resultData && (
        <LayeringResult
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={resultData}
        />
      )}
      {isGenerating && <LayeringLoading onCancel={handleCancelGenerate} />}
    </div>
  );
};

export default LayeringPage;
