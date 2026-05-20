export interface Perfume {
  id: number;
  brand: string;
  name: string;
  imageUrl: string | null;
  scent_type?: string[];
  gender: 'M' | 'W' | 'U';
  rating: number;
  reviewCount?: number;
}
