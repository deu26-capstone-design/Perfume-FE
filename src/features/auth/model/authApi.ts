import client from '@shared/api/client';

const API_BASE_URL = 'https://perfume.biryeong.kim';

let csrfToken: string | null = null;

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

export const refreshCsrfToken = async () => {
  const res = await client.get('/api/auth/csrf');
  csrfToken = res.data?.csrfToken ?? null;
  return csrfToken;
};

const withCsrf = () => (csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : {});

export const signup = async (data: SignupRequest) => {
  const res = await client.post('/api/auth/signup', data);
  await refreshCsrfToken();
  return res;
};

export const login = async (data: LoginRequest) => {
  const res = await client.post('/api/auth/login', data);
  await refreshCsrfToken();
  return res;
};

export const logout = async () => {
  if (!csrfToken) await refreshCsrfToken();
  const res = await client.post('/api/auth/logout', null, { headers: withCsrf() });
  csrfToken = null;
  return res;
};

export const getMe = () => client.get('/api/auth/me');

export const startGoogleLogin = () => {
  window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
};

export const startNaverLogin = () => {
  window.location.href = `${API_BASE_URL}/oauth2/authorization/naver`;
};

export const bootstrapAfterOAuth = async () => {
  await refreshCsrfToken();
  return getMe();
};
