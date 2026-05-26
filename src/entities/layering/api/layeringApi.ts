import client from '@shared/api/client';
import { isAxiosError } from 'axios';

export interface LayeringRecommendationRequest {
  perfumeIds: [number, number];
}

export type LayeringDecision = 'RECOMMENDED' | 'TRY_IF_YOU_LIKE_THIS_MOOD' | 'NOT_RECOMMENDED';

export interface LayeringColorResponse {
  name: string;
  hex: string;
  sourceAccord: string;
  targetAccord: string;
  description: string;
}

export interface ScoreBreakdownResponse {
  matrix: number;
  structure: number;
  balance: number;
  penalty: number;
}

export interface LayeringRecommendation {
  candidateType: 'PAIR';
  recommended: boolean;
  decision: LayeringDecision;
  score: number;
  title: string;
  summary: string;
  color: LayeringColorResponse;
  bestFor: string[];
  reasons: string[];
  warnings: string[];
  scoreBreakdown: ScoreBreakdownResponse;
}

export interface InputPerfumeResponse {
  id: number;
  brand: string;
  name: string;
  dominantAccords: { name: string; ratio: number }[];
}

export interface LayeringRecommendationResponse {
  inputPerfumes: InputPerfumeResponse[];
  recommendation: LayeringRecommendation;
}

export const getLayeringRecommendation = async (
  request: LayeringRecommendationRequest,
): Promise<LayeringRecommendationResponse> => {
  try {
    const response = await client.post<LayeringRecommendationResponse>(
      '/api/layering/recommendations',
      request,
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error('레이어링 추천 요청에 실패했습니다.');
  }
};
