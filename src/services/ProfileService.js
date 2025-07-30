import api from '../api';

export const getUserProfile = async (userId) => {
    const response = await api.get(`/user/${userId}`);
    
  return response.data;
};
