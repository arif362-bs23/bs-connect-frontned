import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/AuthService';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/user/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
