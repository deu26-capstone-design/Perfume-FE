import client from '@shared/api/client';

export type OptionKey = 'A' | 'B' | 'C' | 'D';

export interface ApiQuestion {
  questionNumber: number;
  question: string;
  options: Record<OptionKey, string>;
}

export interface ApiProgressResponse {
  testCompleted: boolean;
  answers: Record<string, OptionKey>;
}

export const getQuestions = () => client.get<ApiQuestion[]>('/api/preference/test/questions');

export const getProgress = () => client.get<ApiProgressResponse>('/api/preference/test/progress');

export const saveProgress = (answers: Record<string, OptionKey>) =>
  client.patch('/api/preference/test/progress', { answers });

export const submitTest = (answers: Record<string, OptionKey>) =>
  client.post('/api/preference/test', { answers });
