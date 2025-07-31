import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/AuthService';
import { paths } from '../../routes/path';
import { useAuth } from '../../hooks/useAuth';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    authService.logout();
    logout();
    window.location.reload();
    navigate(paths.LOGIN);
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
