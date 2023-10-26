import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
