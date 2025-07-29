import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { authService } from '../../services/AuthService';
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

const LoginForm = () => {
  const navigate = useNavigate();
  const methods = useForm();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      toast.success('Login successful!');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Login failed. Please try again.');
    }
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="email"
          label="Email address"
          type="email"
          placeholder="Email address"
          required
          disabled={loginMutation.isPending}
        />

        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          required
          disabled={loginMutation.isPending}
        />

        <SubmitButton
          isPending={loginMutation.isPending}
          text="Log In"
          pendingText="Logging in..."
        />

        {/* Forgot Password */}
        <div className="text-center">
          <Link
            to="/forgot-password"
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
    </FormProvider>
  );
};

export default LoginForm;