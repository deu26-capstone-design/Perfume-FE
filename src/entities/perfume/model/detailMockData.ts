import type { PerfumeDetail } from './detailTypes';

export const mockPerfumeDetail: PerfumeDetail = {
  id: 1,
  name: 'Lust',
  brand: 'Lush',
  gender: 'unisex',
  imageUrl: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.10806.jpg',
  description:
    '재스민의 짙고 어두운 꽃향기가 처음부터 강하게 존재감을 드러낸다. 청순한 꽃향수와 달리 관능적인 면을 가진 재스민이 향의 중심이다. 이 향수가 욕망이라는 이름을 갖는 이유가 첫 향에서부터 명확하다.이 완성된다. 흰 꽃 계열의 특성이 강하게 드러나지만 우디한 깊이가 받쳐주며 단순한 꽃향수로 분류되기 어렵다.향으로는 바닐라의 따뜻한 달콤함과 백단향의 크리미한 나무향이 자리를 잡고, 장미가 얹히며 부드럽게 마무리된다.',
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
