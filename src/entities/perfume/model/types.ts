export interface Perfume {
  id: number;
  brand: string;
  name: string;
  imageUrl: string;
  scent_type: string[];
  gender: 'M' | 'W' | 'U';
  avgRating: number;
}
