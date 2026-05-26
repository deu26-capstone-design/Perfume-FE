import type { Question } from './types';

export const questions: Question[] = [
  {
    id: 1,
    question: '이번 주말, 어디서 시간을 보내고 싶어?',
    answers: [
      { text: '꽃 향기 가득한 플라워 마켓', weights: { Floral: 4, Musky: 1, Fruity: 1 } },
      { text: '비 온 뒤 숲속 산책로', weights: { Green: 3, Fresh: 2, Citrus: 1 } },
      {
        text: '향신료 향 가득한 빈티지 마켓',
        weights: { Woody: 4, Aromatic: 1, 'Earthy/Smoky': 1 },
      },
      { text: '바닐라 캔들 켜진 은은한 조명이 있는 카페', weights: { Sweet: 4, Gourmand: 2 } },
    ],
  },
  {
    id: 2,
    question: '훌쩍 어디론가 떠나고 싶을 때, 어디로 가고 싶어?',
    answers: [
      { text: '프로방스 라벤더 밭', weights: { Musky: 4, Floral: 1, Fruity: 1 } },
      { text: '지중해 레몬 농장', weights: { Citrus: 3, Fresh: 2, Green: 1 } },
      {
        text: '이국적인 향신료 향 가득한 중동 바자르',
        weights: { Aromatic: 3, Spicy: 2, 'Earthy/Smoky': 1 },
      },
      { text: '달콤한 디저트 카페 가득한 파리 골목', weights: { Gourmand: 4, Sweet: 2 } },
    ],
  },
  {
    id: 3,
    question: '오늘따라 내 방이 분위기가 뭔가 마음에 안 들어.. 어떻게 바꿔볼까?',
    answers: [
      { text: '꽃과 과일 향이 가득한 내추럴 공간', weights: { Fruity: 4, Floral: 1, Musky: 1 } },
      {
        text: '화이트와 민트 톤의 깔끔하고 시원한 공간',
        weights: { Fresh: 3, Green: 2, Citrus: 1 },
      },
      {
        text: '원목 가구와 가죽 소파가 있는 클래식한 공간',
        weights: { Woody: 2, Spicy: 3, 'Earthy/Smoky': 1 },
      },
      {
        text: '따뜻한 조명과 패브릭 소품이 가득한 포근한 공간',
        weights: { Sweet: 3, Gourmand: 3 },
      },
    ],
  },
  {
    id: 4,
    question: '오늘따라 카페 메뉴가 다 맛있어 보이네..🤤 뭘 시킬까?',
    answers: [
      { text: '로즈 라떼, 플로럴 티 같은 꽃향 음료', weights: { Floral: 3, Musky: 2, Fruity: 1 } },
      { text: '레몬에이드, 자몽주스 같은 상큼한 음료', weights: { Citrus: 3, Fresh: 2, Green: 1 } },
      {
        text: '아메리카노, 얼그레이 티 같은 쌉쌀한 음료',
        weights: { Woody: 3, Aromatic: 2, Spicy: 1 },
      },
      { text: '바닐라 라떼, 카라멜 마끼아또 같은 달달한 음료', weights: { Gourmand: 4, Sweet: 2 } },
    ],
  },
  {
    id: 5,
    question: '난 이런 날에 기분이 좋더라!',
    answers: [
      { text: '따스하고 포근한 봄바람 부는 날', weights: { Musky: 3, Fruity: 2, Floral: 1 } },
      { text: '소나기 온 뒤 풀내음 가득한 맑은 날', weights: { Green: 3, Citrus: 2, Fresh: 1 } },
      {
        text: '허브와 나무 향이 은은히 퍼지는 선선한 날',
        weights: { Aromatic: 4, 'Earthy/Smoky': 1, Woody: 1 },
      },
      { text: '추운 날씨에 따뜻한 코코아 한 모금 마시는 날', weights: { Sweet: 4, Gourmand: 2 } },
    ],
  },
  {
    id: 6,
    question: '나를 어떤 분위기를 가지고 있을까?',
    answers: [
      { text: '부드럽고 은은한 분위기', weights: { Floral: 2, Musky: 2, Fruity: 2 } },
      { text: '깔끔하고 활기찬 분위기', weights: { Citrus: 3, Green: 2, Fresh: 1 } },
      { text: '강렬하고 개성있는 분위기', weights: { 'Earthy/Smoky': 4, Aromatic: 1, Spicy: 1 } },
      { text: '달콤하고 포근한 분위기', weights: { Sweet: 3, Gourmand: 3 } },
    ],
  },
  {
    id: 7,
    question: '길을 걷다가 향에 이끌려서 나도 모르게 멈춰버렸어. 어디 앞이었을까?',
    answers: [
      { text: '꽃 향기 가득한 꽃집 앞', weights: { Floral: 3 } },
      { text: '비 온 뒤 맑은 공기의 새벽 공원 앞', weights: { Fresh: 3 } },
      { text: '나무 향기 가득한 공방 앞', weights: { Woody: 3 } },
      { text: '향신료 냄새 가득한 이국적인 분위기의 가게 앞', weights: { Spicy: 3 } },
    ],
  },
  {
    id: 8,
    question: '이 냄새를 맡으면 나도 모르게 기분이 좋아진단 말이지..',
    answers: [
      { text: '포근하고 따뜻한 살냄새 같은 향', weights: { Musky: 3 } },
      { text: '상큼하고 깔끔한 시트러스 향', weights: { Citrus: 3 } },
      { text: '허브와 나무가 섞인 은은한 향', weights: { Aromatic: 3 } },
      { text: '비 온 뒤 흙내음과 나무 냄새', weights: { 'Earthy/Smoky': 3 } },
    ],
  },
  {
    id: 9,
    question: '생일 선물로 향수를 받는다면 어떤 향이었으면 좋겠어?',
    answers: [
      { text: '달콤하고 생동감 있는 과일향', weights: { Fruity: 3 } },
      { text: '싱그럽고 자연스러운 풀내음', weights: { Green: 3 } },
      { text: '강렬하고 이국적인 향신료 향', weights: { Spicy: 3 } },
      { text: '신비롭고 스모키한 흙내음', weights: { 'Earthy/Smoky': 3 } },
    ],
  },
  {
    id: 10,
    question: '대문자 N인 친구가 또 만약에를 시전한다. 타임머신이 생기면 어디로 갈 거냐는데 흠..',
    answers: [
      { text: '왈츠가 흐르는 19세기 유럽 무도회', weights: { Floral: 3 } },
      { text: '레몬 향 가득한 고대 지중해 도시', weights: { Fresh: 3 } },
      { text: '향료 무역이 활발하던 실크로드 시대', weights: { Aromatic: 3 } },
      { text: '깊은 숲 속 나무 향 가득한 중세시대', weights: { Woody: 3 } },
    ],
  },
  {
    id: 11,
    question: '아무도 모르는 나만의 공간이 생긴다면?',
    answers: [
      { text: '캔들과 패브릭이 가득한 아늑한 다락방', weights: { Musky: 3 } },
      { text: '통유리창 너머 도시가 보이는 루프탑', weights: { Citrus: 3 } },
      { text: '흙냄새 가득한 지하 비밀 서재', weights: { 'Earthy/Smoky': 3 } },
      { text: '향신료 가득한 이국적인 비밀 상점', weights: { Spicy: 3 } },
    ],
  },
  {
    id: 12,
    question: '어느날 판타지 소설의 주인공이 되었다. 여긴 어디지..?',
    answers: [
      { text: '달콤한 과일이 가득한 신비한 섬', weights: { Fruity: 3 } },
      { text: '싱그러운 자연이 드리워지는 외딴 숲', weights: { Green: 3 } },
      { text: '달콤한 디저트 파티가 매일 열리는 마을', weights: { Sweet: 3 } },
      { text: '초콜릿과 캐러멜 향 가득한 동화 세계', weights: { Gourmand: 3 } },
    ],
  },
];
