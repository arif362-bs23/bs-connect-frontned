// src/components/LoginForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // You'll implement actual login logic later
    console.log("Form Data:", data);
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
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-700 transition duration-200"
      >
        Log In
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
            to="#"
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