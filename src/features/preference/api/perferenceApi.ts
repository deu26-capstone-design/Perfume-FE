import client from '@shared/api/client';

export interface Top5Response {
  testCompleted: boolean;
  top5: { scentName: string; score: number }[];
}

export interface ProgressResponse {
  testCompleted: boolean;
  answers: Record<string, string>;
}

export const getPreferenceTop5 = async (): Promise<Top5Response> => {
  const response = await client.get('/api/preference/top5');
  return response.data;
};

export const getTestProgress = async (): Promise<ProgressResponse> => {
  const response = await client.get('/api/preference/test/progress');
  return response.data;
};
