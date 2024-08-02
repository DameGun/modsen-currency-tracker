import axios from 'axios';

import { API_BASE_URL, API_KEY } from '@/constants/environment';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    apikey: API_KEY,
  },
});
