import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

const openaiServiceUrl = process.env.REACT_APP_OPENAI_ASSISTANT_SERVICE_URL;

export const openaiAxiosInstance = axios.create({
  baseURL: openaiServiceUrl,
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

openaiAxiosInstance.interceptors.request.use(
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
