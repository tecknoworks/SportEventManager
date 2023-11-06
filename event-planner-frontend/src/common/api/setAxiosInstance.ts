import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 2000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

function getJwtToken() {
  let token = localStorage.getItem('token') || '';
  return token.replace(/^"|"$/g, '');
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
