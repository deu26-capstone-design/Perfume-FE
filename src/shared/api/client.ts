import axios from 'axios';

const client = axios.create({
  baseURL: 'https://perfume.biryeong.kim',
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const xsrf = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  if (xsrf && config.method !== 'get') {
    config.headers['X-XSRF-TOKEN'] = xsrf;
  }

  return config;
});

export default client;
