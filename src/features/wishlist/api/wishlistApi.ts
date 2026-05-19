import client from '@shared/api/client';

export const addWishlist = (perfumeId: number) => client.post(`/api/wishlist/${perfumeId}`);

export const removeWishlist = (perfumeId: number) => client.delete(`/api/wishlist/${perfumeId}`);
