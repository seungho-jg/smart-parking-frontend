import apiClient from './index';

export const getMyHistory = async () => {
  return await apiClient.get('/api/my/parking-history');
};

export const getMyProfile = async () => {
  return await apiClient.get('/api/my/profile');
}