import client from '@shared/api/client';
import type { Perfume } from '../model/types';

export interface PerfumeListParams {
  keyword?: string;
  gender?: Perfume['gender'];
  accord?: string[];
  sort?: 'rating_asc' | 'rating_desc';
  page?: number;
  size?: number;
}

export interface PerfumeListResponse {
  content: Perfume[];
  pageNum: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export const getPerfumes = (params: PerfumeListParams) =>
  client.get<PerfumeListResponse>('/api/perfumes', {
    params,
    paramsSerializer: { indexes: null },
  });

export const getAccords = () => client.get<string[]>('/api/accords');
