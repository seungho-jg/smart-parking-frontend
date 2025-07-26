import apiClient from './index';

export const getParkingSpaces = async () => {
  return await apiClient.get('/api/parking-spaces');
};

export const reserveParkingSpace = async (spaceId) => {
  return await apiClient.post('/api/reservations', { spaceId });
};
