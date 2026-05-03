export interface PerfumeDetail {
  id: number;
  imageUrl: string;
  brand: string;
  name: string;
  gender: 'W' | 'M' | 'U';
  description: string;
  rating: number;
  reviewCount: number;
  notes: {
    top: string[];
    mid: string[];
    base: string[];
  };
  accords: {
    name: string;
    ratio: number;
  }[];
}
