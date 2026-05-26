import client from '@shared/api/client';

export interface WishlistItem {
  perfumeId: number;
  imageUrl: string | null;
  brand: string;
  name: string;
}

export const getMyWishlist = async (): Promise<WishlistItem[]> => {
  const response = await client.get<WishlistItem[]>('/api/wishlist');
  return response.data;
};

export const removeMyWishlist = async (perfumeId: number): Promise<void> => {
  await client.delete(`/api/wishlist/${perfumeId}`);
};
