import { Navigate } from 'react-router-dom';
import { authService } from '../services/AuthService';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  
  return isAuthenticated ? children : <Navigate to="/user/login" replace />;
};

export default ProtectedRoute;