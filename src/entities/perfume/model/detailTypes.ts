export interface PerfumeDetail {
  id: number;
  name: string;
  brand: string;
  gender: 'female' | 'male' | 'unisex';
  imageUrl: string;
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
