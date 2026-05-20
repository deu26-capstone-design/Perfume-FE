import type { Perfume } from '@entities/perfume/model/types';

export type SlotKey = 'first' | 'second';

export interface SlotState {
  perfume: Perfume | null;
  accords: string[];
  search: string;
}

export const INITIAL_SLOT_STATE: SlotState = {
  perfume: null,
  accords: [],
  search: '',
};
