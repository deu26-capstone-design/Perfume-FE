import type { PerfumeDetail } from './detailTypes';

export const mockPerfumeDetail: PerfumeDetail = {
  id: 1,
  name: 'Lust',
  brand: 'Lush',
  gender: 'unisex',
  imageUrl: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.10806.jpg',
  description:
    '재스민을 깨끗하게 다듬기보다, 살짝 야성적이고 뜨거운 흰 꽃으로 표현한 향수입니다. 일랑일랑의 노란 꽃결과 바닐라의 온기, 샌달우드의 부드러운 나무결이 더해져 피부 가까이에서 농밀하게 퍼집니다.\n재스민은 장식적인 플로럴이 아니라 이 향의 중심축입니다. 장미는 꽃잎의 그림자를 더하고, 샌달우드는 흰 꽃의 날카로운 모서리를 둥글게 정리합니다. 바닐라는 디저트처럼 달기보다 꽃의 관능을 오래 붙잡는 역할을 합니다.\n깨끗한 비누 향보다 더 인간적인 플로럴을 원할 때 잘 어울립니다. 선명한 존재감이 있지만 차갑지 않고, 가까운 거리에서 더 매혹적으로 느껴지는 타입입니다.',
  notes: {
    top: ['재스민'],
    mid: ['일랑일랑'],
    base: ['바닐라', '샌달우드', '로즈'],
  },
  accords: [
    { name: 'Floral', ratio: 100 },
    { name: 'Sweet', ratio: 44 },
    { name: 'Woody', ratio: 27 },
    { name: 'Musky', ratio: 38 },
    { name: 'Citrus', ratio: 21 },
  ],
};
