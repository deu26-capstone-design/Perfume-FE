export type AccordKey =
  | 'Floral'
  | 'Woody'
  | 'Fresh'
  | 'Spicy'
  | 'Sweet'
  | 'Musky'
  | 'Green'
  | 'Gourmand'
  | 'Citrus'
  | 'Fruity'
  | 'Aromatic'
  | 'Earthy/Smoky';

export interface Answer {
  text: string;
  weights: Partial<Record<AccordKey, number>>;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

/** questionId(1~12) → 선택지 인덱스(0~3) */
export type TestAnswers = Record<number, number>;

export interface TestResult {
  accord: AccordKey;
  score: number;
}
