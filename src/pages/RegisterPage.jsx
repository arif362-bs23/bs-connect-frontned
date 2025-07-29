import { useForm, FormProvider } from "react-hook-form";
import InputField from "../components/auth/InputField";
import SelectField from "../components/auth/SelectField";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { authService } from '../services/AuthService';

const Register = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success('Registration successful! Please log in.');
      navigate('/user/login');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  const genderOptions = ["male", "female"];

  return (
    <div className="w-full lg:w-1/3 border border-primary-200 p-6 rounded mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Create New Account</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputField name="name" label="Full Name" placeholder="Full name" />
          <InputField name="email" label="Email address" type="email" placeholder="email@example.com" />
          <InputField name="birthdate" label="Date of birth" type="date" />
          <SelectField name="gender" label="Gender" options={genderOptions} />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            validation={{
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters long" },
            }}
          />
          <InputField
            name="password_confirmation"
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            validation={{
              required: "Password confirmation is required",
              validate: (value) =>
                value === methods.getValues("password") || "Passwords do not match",
            }}
          />

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link className="underline text-blue-600" to="/user/login">
            Login
          </Link>
        </div>
      </FormProvider>
    </div>
  );
};

export default Register;
