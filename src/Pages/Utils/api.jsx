import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.shivyantra.com',
});

export default api;
