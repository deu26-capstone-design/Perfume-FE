import type { PerfumeDetail } from './detailTypes';

export const mockPerfumeDetails: PerfumeDetail[] = [
  {
    id: 4,
    name: 'Lust',
    brand: 'Lush',
    gender: 'U',
    rating: 3.2,
    reviewCount: 5,
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
      { name: 'Musky', ratio: 38 },
      { name: 'Woody', ratio: 27 },
      { name: 'Citrus', ratio: 21 },
    ],
  },
  {
    id: 1,
    name: 'Chamo',
    brand: 'Tamburins',
    gender: 'U',
    rating: 4.8,
    reviewCount: 0,
    imageUrl: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.78952.jpg',
    description:
      '카모마일의 포근하고 따뜻한 허브향을 중심으로, 베르가못의 상큼한 시작과 머스크의 부드러운 마무리가 조화를 이루는 향수입니다. 자극적이지 않고 은은하게 퍼지는 것이 특징으로, 마치 따뜻한 차 한 잔처럼 편안한 느낌을 줍니다.\n로즈와 아이리스가 중간에서 은근한 플로럴 결을 더해주고, 샌달우드가 전체적으로 따뜻한 나무의 온기를 받쳐줍니다.\n일상에서 부담 없이 뿌리기 좋으며, 계절을 가리지 않고 두루 어울리는 편안한 향입니다. 향수 입문자에게도, 포근한 향을 좋아하는 분에게도 추천합니다.',
    notes: {
      top: ['카모마일', '베르가못'],
      mid: ['로즈', '아이리스'],
      base: ['머스크', '샌달우드', '앰버'],
    },
    accords: [
      { name: 'Floral', ratio: 100 },
      { name: 'Musky', ratio: 78 },
      { name: 'Aromatic', ratio: 65 },
      { name: 'Woody', ratio: 42 },
      { name: 'Sweet', ratio: 30 },
    ],
  },
  {
    id: 32,
    name: 'Another 13',
    brand: 'Le Labo',
    gender: 'U',
    rating: 4.9,
    reviewCount: 0,
    imageUrl: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.10131.jpg',
    description:
      '앰브록산을 중심으로 구성된 향수로, 피부와 맞닿는 순간 묘하게 체온처럼 느껴지는 따뜻하고 관능적인 무스크 향입니다. 재스민의 흰 꽃이 가볍게 깔리고, 앰브렛 씨드의 부드러운 씨앗 향이 전체를 감싸줍니다.\n향수라기보다 깨끗한 피부 위에 살짝 남은 체향처럼 느껴지는 것이 특징입니다. 과하지 않게 은은하게 퍼지면서도, 가까운 거리에서는 분명하게 존재감을 드러냅니다.\n향수를 잘 모르는 사람도, 향수에 진심인 사람도 모두 끌리는 독특한 매력이 있습니다. 계절과 성별을 타지 않아 언제든 뿌리기 좋습니다.',
    notes: {
      top: ['앰브렛 씨드', '모스'],
      mid: ['앰브록산', '재스민'],
      base: ['머스크', '모스', '시벳'],
    },
    accords: [
      { name: 'Musky', ratio: 100 },
      { name: 'Floral', ratio: 62 },
      { name: 'Woody', ratio: 45 },
      { name: 'Fruity', ratio: 28 },
      { name: 'Spicy', ratio: 15 },
    ],
  },
];
