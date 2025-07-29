import { Navigate } from 'react-router-dom';
import { authService } from '../services/AuthService';
import { paths } from '../routes/path';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();

  return isAuthenticated ? children : <Navigate to={paths.LOGIN} replace />;
};

export default ProtectedRoute;