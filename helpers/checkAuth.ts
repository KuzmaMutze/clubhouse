import { GetServerSidePropsContext } from 'next';
import Cookies from 'nookies';
import instance, { authAPI } from '../api/api';

export const checkAuth = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = Cookies.get(ctx);

    if (cookies.token) {
      instance.defaults.headers.Authorization = `Bearer ${cookies.token}`;
    }

    let data = await authAPI.getMe();

    return data;
  } catch (error) {
    console.log('Error with checkAuth');
    return null;
  }
};
