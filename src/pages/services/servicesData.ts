import mainPage from './assets/main-page.png';
import accordPage from './assets/accord-page.png';
import layeringPage from './assets/layering-page.png';
import testPage from './assets/test-page.png';

export interface ServiceFeature {
  label: string;
  title: string;
  desc: string;
  image: string | null;
}

export const features: ServiceFeature[] = [
  {
    label: '향수 탐색',
    title: '다양한 향수를\n한눈에 확인하세요.',
    desc: '수백 가지 향수 정보를 브랜드, 계열별로 탐색하고\n마음에 드는 향수는 위시리스트에 저장해보세요.',
    image: mainPage,
  },
  {
    label: '향 계열 안내',
    title: '향 계열의 특징을\n쉽게 이해할 수 있어요.',
    desc: '플로럴, 우디, 시트러스 등 12가지 향 계열의\n특징과 대표 향수를 함께 소개해드립니다.',
    image: accordPage,
  },
  {
    label: '레이어링 가이드',
    title: '나만의 시그니처 향을\n만들어 보세요.',
    desc: '두 가지 향수를 조합하는 레이어링 기능을 통해\n세상에 하나뿐인 나만의 향을 완성해보세요.',
    image: layeringPage,
  },
  {
    label: '향 선호도 테스트',
    title: '나에게 어울리는 향을\n찾아드릴게요.',
    desc: '12가지 질문을 통해 나의 향 취향을 분석하고\n어떤 향을 좋아하는지 파악해보세요.',
    image: testPage,
  },
];
