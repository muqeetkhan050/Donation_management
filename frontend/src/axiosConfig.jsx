import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://16.176.12.11:5001', // local
  //baseURL: 'http://3.26.96.188:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
