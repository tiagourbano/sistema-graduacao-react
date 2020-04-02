import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sistema-graduacao-api.herokuapp.com/'
});

export default api;
