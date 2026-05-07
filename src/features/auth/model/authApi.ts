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

export const signup = (data: SignupRequest) => client.post('/api/auth/signup', data);

export const login = (data: LoginRequest) => client.post('/api/auth/login', data);

export const logout = () => client.post('/api/auth/logout');

export const getMe = () => client.get('/api/auth/me');
