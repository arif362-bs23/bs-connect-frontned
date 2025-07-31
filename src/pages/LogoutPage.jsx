import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { paths } from '../routes/path';
import { authService } from '../services/AuthService';

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    authService.logout();
    navigate(paths.LOGIN, { replace: true });
  }, [logout, navigate]);

  return null; // This component doesn't render anything
};

export default LogoutPage;
