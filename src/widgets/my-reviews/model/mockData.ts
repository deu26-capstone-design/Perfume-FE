import { type MyReviewType } from '@features/review/ui/MyReviewItem';

export const myReviewMockData: MyReviewType[] = [
  {
    id: 1,
    perfumeName: 'Black Orchid',
    brandName: 'Tom Ford',
    imageUrl: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.1018.jpg',
    satisfaction: 5,
    longevity: 3,
    seasons: ['가을', '겨울'],
    scents: ['나무 향', '스파이시한 향'],
    comment:
      '흔하지 않은 향과 묵직한 내음이 섞여 있어 굉장히 지적이고 차분한 인상을 줍니다. 겨울에 특히 잘 어울리는 것 같아요.',
    createdAt: '2026-03-29T10:00:00Z',
  },
  {
    id: 2,
    perfumeName: 'Homme Intense 2011',
    brandName: 'Dior',
    imageUrl: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.13016.jpg',
    satisfaction: 4,
    longevity: 2,
    seasons: ['봄'],
    scents: ['꽃 향', '청량한 향'],
    comment: '꽃 향기가 아주 우아하고 생기 넘쳐요. 봄에 뿌리기 딱 좋습니다.',
    createdAt: '2026-04-12T15:30:00Z',
  },
  {
    id: 3,
    perfumeName: 'Eau Duelle Eau de Toilette',
    brandName: 'Diptyque',
    imageUrl: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.9241.jpg',
    satisfaction: 4,
    longevity: 2,
    seasons: ['여름'],
    scents: ['꽃 향', '청량한 향', '달콤한 향', '따뜻한 향'],
    comment: '꽃 향기가 아주 우아하고 생기 넘쳐요. 여름에 뿌리기 딱 좋습니다.',
    createdAt: '2026-05-12T15:30:00Z',
  },
];
