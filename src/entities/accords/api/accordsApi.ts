import client from '@shared/api/client';

export interface AccordDetail {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface NoteItem {
  name: string;
  imageUrl: string;
}

export interface PerfumeItem {
  id: number;
  imageUrl: string | null;
  brand: string;
  name: string;
  gender: string;
  rating: number;
  reviewCount: number;
}

export interface PageResponse<T> {
  content: T[];
  pageNum: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export const accordsApi = {
  getAccordsDetail: async () => {
    const response = await client.get<AccordDetail[]>('/api/accords/detail');
    return response.data;
  },

  getAccordNotes: async (id: number, page: number = 0, size: number = 30) => {
    const response = await client.get<PageResponse<NoteItem>>(`/api/accords/detail/${id}/notes`, {
      params: { page, size },
    });
    return response.data;
  },

  getAccordPerfumes: async (id: number, page: number = 0, size: number = 30) => {
    const response = await client.get<PageResponse<PerfumeItem>>(
      `/api/accords/detail/${id}/perfumes`,
      {
        params: { page, size },
      },
    );
    return response.data;
  },
};
