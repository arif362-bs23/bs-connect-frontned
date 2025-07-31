import api from '../api';

export const friendService = {
  toggleFollow: async (userId) => {
    const response = await api.post(`/friends/toggle_follow/${userId}`);
    return response.data;
  },
};
