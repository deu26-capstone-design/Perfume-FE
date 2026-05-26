import axios from 'axios';

let _csrfToken: string | null = null;
export const updateClientCsrfToken = (token: string | null) => {
  _csrfToken = token;
};

let _refreshCsrfToken: (() => Promise<unknown>) | null = null;
export const setRefreshCsrfCallback = (fn: () => Promise<unknown>) => {
  _refreshCsrfToken = fn;
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

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const url: string = error.config?.url ?? '';
    const isCsrfEndpoint = url.includes('/api/auth/csrf');
    if (
      error.response?.status === 403 &&
      !error.config?._csrfRetry &&
      !isCsrfEndpoint &&
      _refreshCsrfToken
    ) {
      error.config._csrfRetry = true;
      try {
        await _refreshCsrfToken();
        return client(error.config);
      } catch {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default client;
