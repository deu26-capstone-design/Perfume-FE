import client from '@shared/api/client';

export const addWishlist = (perfumeId: number, userId: number) =>
  client.post(`/api/wishlist/${perfumeId}`, null, { params: { userId } });

export const removeWishlist = (perfumeId: number, userId: number) =>
  client.delete(`/api/wishlist/${perfumeId}`, { params: { userId } });
