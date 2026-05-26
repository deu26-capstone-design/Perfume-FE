import client from '@shared/api/client';
import type { Review } from '../model/types';

export interface ReviewListResponse {
  reviews: Review[];
  total: number;
}

export const getReviews = async (perfumeId: number, page: number, limit: number) => {
  return await client.get<ReviewListResponse>(`/api/perfumes/${perfumeId}/reviews`, {
    params: { page, limit },
  });
};

export const getMyReviews = async (page = 0, size = 30) => {
  const response = await client.get('/api/auth/me/reviews', {
    params: { page, size },
  });
  return response.data;
};

export const patchReview = async (reviewId: number, data: any) => {
  return await client.patch(`/api/perfumes/reviews/${reviewId}`, data);
};

export const deleteReview = async (reviewId: number) => {
  return await client.delete(`/api/perfumes/reviews/${reviewId}`);
};
