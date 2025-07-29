import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/AuthService';

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      // Redirect to dashboard or home page
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // Handle login error (show toast, etc.)
    }
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Email address"
          disabled={loginMutation.isPending}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Password"
          disabled={loginMutation.isPending}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Error message */}
      {loginMutation.isError && (
        <div className="text-red-500 text-sm text-center">
          {loginMutation.error?.response?.data?.message || 'Login failed. Please try again.'}
        </div>
      )}

      {/* Login Button */}
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loginMutation.isPending ? 'Logging in...' : 'Log In'}
      </button>

      {/* Forgot Password */}
      <div className="text-center">
        <Link
          to="#"
          className="text-blue-600 hover:underline text-sm"
        >
          Forgot Password?
        </Link>
      </div>

      <hr className="my-4" />

      {/* Create Account + Visit Feed */}
      <div className="flex text-center justify-between gap-5">
        <div>
          <Link
            to="/register"
            className="text-blue-600 hover:underline text-sm"
          >
            Create Account
          </Link>
        </div>
        <div>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Visit BS-23 Feed
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;