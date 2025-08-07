import api from '../api';

export const newsFeedService = {
  getNewsFeed: async (page = 1) => {
    const response = await api.get('/newsfeed/', {
      params: {
        page,
      },
    });
    return response.data;
  },
};
