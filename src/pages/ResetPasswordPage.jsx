import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authService } from '../services/AuthService';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await authService.resetPassword(token, data);
      toast.success('Password has been reset successfully');
      navigate('/login');
    } catch (error) {
      const response = error.response;
      
      if (response && response.status === 422 && response.data && Array.isArray(response.data.detail)) {
        toast.error('Unrecognized token or invalid data');
        response.data.detail.forEach(err => {
          const fieldName = err.loc[err.loc.length - 1];
          if (fieldName) {
            setError(fieldName, {
              type: 'server',
              message: err.msg
            });
          }
        });
      } else {
        // Handle other errors (e.g., 404, 500)
        toast.error(response?.data?.detail || 'Password reset failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              id="new_password"
              type="password"
              placeholder="Enter new password"
              {...register('new_password', { required: 'New password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.new_password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.new_password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirm_password"
              type="password"
              placeholder="Re-enter password"
              {...register('confirm_password', {
                required: 'Please confirm your password',
                validate: (value) => value === watch('new_password') || 'Passwords do not match',
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirm_password && (
              <p className="mt-1 text-sm text-red-500">{errors.confirm_password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
