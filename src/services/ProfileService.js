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

export const updateBio = async (bioData) => {
  const response = await api.put('/user/profile', bioData);
  return response.data;
};
