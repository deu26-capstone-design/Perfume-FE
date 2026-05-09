export interface PerfumeDetail {
  id: number;
  imageUrl: string | null;
  brand: string;
  name: string;
  gender: 'W' | 'M' | 'U';
  description: string | null;
  rating: number;
  reviewCount: number;
  notes: {
    top: string[];
    mid: string[];
    base: string[];
  };
  accords: {
    accordName: string;
    ratio: number;
  }[];
  satisfaction: Record<'1' | '2' | '3' | '4' | '5', number>;
  longevity: Record<'1' | '2' | '3', number>;
  seasons: Record<'봄' | '여름' | '가을' | '겨울', number>;
}
