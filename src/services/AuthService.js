import api from '../api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/user/login', credentials);
    const { token, user } = response.data;
    
    // Store tokens and user data
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);
    localStorage.setItem('user', JSON.stringify(user));

    
    
    return { token, user };
  },
  
  register: async (userData) => {
    const response = await api.post('/user/', userData);
    return response.data;
  },

  forgotPassword: async (email) => {
    return await api.post('/user/forget-password', { email });
  },

  resetPassword: async (token, resetData) => {
    return await api.post(`/user/reset-password/${token}`, resetData);
  },


  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
};