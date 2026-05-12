import { LayeringPerfumeSelection } from '@widgets/layering-perfume-selection/LayeringPerfumeSelection';
import type { Perfume } from '@entities/perfume/model/types';
import type { SlotKey, SlotState } from '../model/layeringTypes';

interface Props {
  slot: SlotKey;
  slotState: SlotState;
  activeSlot: SlotKey;
  isBothBright: boolean;

  onActivate: (slot: SlotKey) => void;
  onSelectPerfume: (slot: SlotKey, perfume: Perfume) => void;
  onToggleAccord: (slot: SlotKey, accord: string) => void;
  onReset: (slot: SlotKey) => void;
  onSearchChange: (slot: SlotKey, search: string) => void;
}

export const LayeringSelectionSection = ({
  slot,
  slotState,
  activeSlot,
  isBothBright,

  onActivate,
  onSelectPerfume,
  onToggleAccord,
  onReset,
  onSearchChange,
}: Props) => {
  return (
    <div
      className={`selection-box ${isBothBright || activeSlot === slot ? 'is-active' : ''}`}
      onClick={() => onActivate(slot)}
    >
      <LayeringPerfumeSelection
        selectedPerfume={slotState.perfume}
        onSelectPerfume={(perfume) => onSelectPerfume(slot, perfume)}
        selectedCategories={slotState.accords}
        onUpdateCategory={(accord) => onToggleAccord(slot, accord)}
        onReset={() => onReset(slot)}
        searchKeyword={slotState.search}
        onSearchChange={(search) => onSearchChange(slot, search)}
      />
    </div>
  );
};
