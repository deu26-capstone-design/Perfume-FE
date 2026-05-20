import axios from 'axios';

let _csrfToken: string | null = null;
export const updateClientCsrfToken = (token: string | null) => {
  _csrfToken = token;
};

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  if (_csrfToken && config.method !== 'get') {
    config.headers['X-XSRF-TOKEN'] = _csrfToken;
  }

  return config;
});

export default client;
