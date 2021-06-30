import Axios from 'axios';
import { parseCookies } from 'nookies';
import { User } from '../types/types';

const cookies = parseCookies();
// const token = cookies.token;

const instance = Axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    Authorization: 'Bearer ' + cookies.token,
  },
});

// instance.interceptors.request.use((config) => {
//   const cookies = parseCookies();
// config.headers['Authorization'] = 'Bearer ' + cookies.token;
// return config;
// });

export const authAPI = {
  getMe() {
    return instance.get(`auth/me`);
  },
  sendSMSOnTel(number: string) {
    instance.get(`auth/sms?phone=${number}`);
  },
  activateCode(code: string) {
    instance.get(`auth/sms/activate?code=${code}`);
  },
};

export default instance;
