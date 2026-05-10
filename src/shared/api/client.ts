import axios from 'axios';

let _csrfToken: string | null = null;
export const updateClientCsrfToken = (token: string | null) => {
  _csrfToken = token;
};

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  withCredentials: true,
});

client.interceptors.response.use((response) => {
  const contentType = String(response.headers['content-type'] ?? '');
  if (contentType.includes('text/html')) {
    return Promise.reject({ response: { status: 401 } });
  }
  return response;
});

client.interceptors.request.use((config) => {
  const cookieToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  const xsrf = cookieToken ?? _csrfToken;

  if (xsrf && config.method !== 'get') {
    config.headers['X-XSRF-TOKEN'] = xsrf;
  }

  return config;
});

export default client;
