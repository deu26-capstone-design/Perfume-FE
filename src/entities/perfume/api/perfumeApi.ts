import client from '@shared/api/client';
import type { Perfume } from '../model/types';
import type { PerfumeDetail } from '../model/detailTypes';
import type { Review } from '@entities/review/model/types';

export interface ReviewListResponse {
  content: Review[];
  pageNum: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

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

export const getPerfumeDetail = (id: number) =>
  client.get<PerfumeDetail>(`/api/perfumes/${id}`);

export const getReviews = (id: number, page: number, size = 10) =>
  client.get<ReviewListResponse>(`/api/perfumes/${id}/reviews`, { params: { page, size } });

export interface ReviewRequest {
  satisfaction: 1 | 2 | 3 | 4 | 5;
  longevity: 1 | 2 | 3 | null;
  seasons: string[] | null;
  scents: string[] | null;
  comment: string | null;
  disclaimerAgreed: true;
}

export const postReview = (id: number, data: ReviewRequest) =>
  client.post(`/api/perfumes/${id}/reviews`, data);
