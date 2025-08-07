import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthProvider from './providers/AuthProvider';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage';
import { paths } from './routes/path';
import MainLayout from "./components/layout/MainLayout.jsx";
import PostPage from "./pages/PostPage.jsx";
import NewsFeedPage from "./pages/NewsFeedPage.jsx";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            {/* Public Routes */}
            <Route path={paths.LOGIN}  element={<LoginPage />} />
            <Route path={paths.REGISTER} element={<RegisterPage />} />
            <Route path={paths.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            <Route path={paths.RESET_PASSWORD} element={<ResetPasswordPage />} />
            <Route path={paths.LOGOUT} element={<LogoutPage />} />


            <Route element={<MainLayout />}>
              <Route path={paths.HOME} element={<Navigate to={paths.LOGIN} replace />} />
              <Route path={paths.PROFILE} element={<ProfilePage />} />
              <Route path={paths.POST} element={<PostPage />} />
              <Route path={paths.NEWSFEED} element={<NewsFeedPage />} />
            </Route>

            {/* Protected Route - Only DashboardPage */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to={paths.LOGIN} replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App