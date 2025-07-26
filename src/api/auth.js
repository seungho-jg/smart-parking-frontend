import apiClient from './index';

export const signup = async (data) => {
  return await apiClient.post('/api/auth/signup', data);
};

export const login = async (data) => {
  return await apiClient.post('/api/auth/login', data);
};


export const logout = async () => {
  return await apiClient.post('/api/auth/logout');
};
