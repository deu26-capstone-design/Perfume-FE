export type Accord = {
  name: string;
  description: string;
  imageUrl: string;
  notes: {
    name: string;
    imageUrl: string;
  }[];
  perfumes: {
    id: number;
    name: string;
    brand: string;
    imageUrl: string;
  }[];
};
