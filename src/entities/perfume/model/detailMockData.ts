import type { PerfumeDetail } from './detailTypes';

export const mockPerfumeDetail: PerfumeDetail = {
  id: 1,
  name: 'Lust',
  brand: 'Lush',
  gender: 'unisex',
  imageUrl: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.10806.jpg',
  description: '재스민의 짙고 어두운 꽃향기가 처음부터 강하게 존재감을 드러낸다...',
  notes: {
    top: ['재스민'],
    mid: ['일랑일랑'],
    base: ['바닐라', '샌달우드', '로즈'],
  },
  accords: [
    { name: 'Floral', ratio: 100 },
    { name: 'Sweet', ratio: 44 },
    { name: 'Woody', ratio: 27 },
  ],
};
