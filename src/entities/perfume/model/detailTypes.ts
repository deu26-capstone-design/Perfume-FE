export interface PerfumeDetail {
  id: number;
  name: string;
  brand: string;
  gender: string;
  imageUrl: string;
  description: string;
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
