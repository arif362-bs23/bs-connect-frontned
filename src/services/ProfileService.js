import api from '../api';

export const getUserProfile = async (userId) => {
    const response = await api.get(`/user/${userId}`);
    
  return response.data;
};

export const uploadCoverImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post('/user/upload-cover-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post('/user/upload-profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const updateUserProfile = async (profileData) => {
  const response = await api.put('/user/profile', profileData);
  return response.data;
};

export const getFollowers = async (userId) => {
  const response = await api.get(`/user/${userId}/followers`);
  return response.data;
};

export const getFollowing = async (userId) => {
  const response = await api.get(`/user/${userId}/following`);
  return response.data;
};

export const toggleFollowUser = async (userId) => {
    const response = await api.post(`/user/${userId}/follow`);
    return response.data;
};

export const getUserPosts = async (userId, limit = 10, offset = 0) => {
  const response = await api.get(`/posts/${userId}/posts`, {
    params: { user_id: userId, limit, offset },
  });
  return response.data;
};