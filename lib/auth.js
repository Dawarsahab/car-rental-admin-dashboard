import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const getAuthToken = (ctx) => {
  const cookies = parseCookies(ctx);
  return cookies.adminToken || null;
};

export const setAuthToken = (token, ctx = null) => {
  setCookie(ctx, 'adminToken', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
};

export const removeAuthToken = (ctx = null) => {
  destroyCookie(ctx, 'adminToken');
};

export const isAuthenticated = (ctx) => {
  return !!getAuthToken(ctx);
};

export const withAuth = (gssp) => {
  return async (context) => {
    const token = getAuthToken(context);
    
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return await gssp(context);
  };
};