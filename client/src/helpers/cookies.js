import cookie from 'react-cookies';

export const getCookie = (key) => cookie.load(key);

export const setCookie = (key, value, options = {}) => cookie.save(key, value, options);

export const removeCookie = (key, options = {}) => cookie.remove(key, options);

export const saveUserCookies = (token) => {
  //const { access_token, expires_in, refresh_token } = token;
  setCookie('accessToken', token, { maxAge: 60 * 60 * 24 * 30 * 1000 });
  //setCookie('refreshToken', refresh_token);
};

export const removeUserCookies = () => {
  removeCookie('accessToken');
  //removeCookie('refreshToken');
};