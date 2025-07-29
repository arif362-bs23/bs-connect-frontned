import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { authService } from '../services/AuthService';
import InputField from "../components/auth/InputField";
import SubmitButton from "../components/auth/SubmitButton";
import { paths } from "../routes/path";

const ForgotPasswordPage = () => {
  const methods = useForm();

  const forgotPasswordMutation = useMutation({
    mutationFn: (data) => authService.forgotPassword(data.email),
    onSuccess: () => {
      toast.success('Password reset link sent! Check your email.');
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to send password reset link. Please try again.');
    },
  });

  const onSubmit = (data) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <main className="flex flex-col min-h-screen w-screen justify-center items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">Forgot Password</h1>

          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="email@example.com"
            required
            disabled={forgotPasswordMutation.isPending}
          />

          <SubmitButton
            isPending={forgotPasswordMutation.isPending}
            text="Email Password Reset Link"
            pendingText="Sending..."
          />
        </form>
      </FormProvider>

      <div className="text-center text-sm text-zinc-400 mt-4">
        Or, return to{" "}
        <Link className="underline" to={paths.LOGIN}>
          log in
        </Link>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;