export interface Review {
  nickname: string;
  profileImageUrl: string | null;
  satisfaction: 1 | 2 | 3 | 4 | 5;
  longevity: 1 | 2 | 3 | null;
  seasons: ('봄' | '여름' | '가을' | '겨울')[] | null;
  scents: string[] | null;
  comment: string | null;
  createdAt: string;
}
