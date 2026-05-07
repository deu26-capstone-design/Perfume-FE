import client from '@shared/api/client';

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  nickname: string;
  gender: 'M' | 'F';
  birthDate: string;
  phoneNumber: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const getCsrfToken = async (): Promise<string | null> => {
  const res = await client.get('/api/auth/csrf');
  return res.data?.csrfToken ?? null;
};

export const signup = async (data: SignupRequest) => {
  const csrfToken = await getCsrfToken();
  return client.post('/api/auth/signup', data, {
    headers: csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : {},
  });
};

export const login = async (data: LoginRequest) => {
  const csrfToken = await getCsrfToken();
  return client.post('/api/auth/login', data, {
    headers: csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : {},
  });
};

export const logout = async () => {
  const csrfToken = await getCsrfToken();
  return client.post('/api/auth/logout', null, {
    headers: csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : {},
  });
};

export const getMe = () => client.get('/api/auth/me');
