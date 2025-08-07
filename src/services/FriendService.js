import api from '../api';

export const friendService = {
  toggleFollow: async (userId) => {
    const response = await api.post(`/friends/toggle_follow/${userId}`);
    return response.data;
  },
  findFriends: async (query) => {
    const response = await api.get(`/friends/find-friends`, {
      params: { query },
    });
    console.log(response.data);
    return response.data;
  },
};
