import { createContext, useContext, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://guardsystem.site:3000';

const configuration = (method, path, data) => ({
  method: method,
  url: `${BASE_URL}${path}`,
  data: data,
});

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [cookies, setCookies, removeCookie] = useCookies();

  if (!cookies) {
    localStorage.removeItem('userData');
  }

  const login = ({ email, passwd }) => {
    return axios(configuration('post', '/auth/login', { email, passwd }))
      .then((res) => {
        if (res.data?.token) {
          removeCookie('token');
          setCookies('token', res.data?.token.toString());

          localStorage.removeItem('userData');

          localStorage.setItem(
            'userData',
            JSON.stringify({
              userId: res.data.user_id,
              firstName: res.data.firstname,
              lastName: res.data.lastname,
              role: res.data.role,
            })
          );

          if (res.data.role === 1) navigate('admin');

          if (res.data.role === 2 || res.data.role === 3) navigate('user-about');

          return res.data;
        }
      })
      .catch((err) => err.response.data);
  };

  const logout = () => {
    localStorage.removeItem('userData');

    ['token', 'name'].forEach((obj) => removeCookie(obj)); // remove data save in cookies
    navigate('/login');
  };

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
    }),
    [cookies]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
