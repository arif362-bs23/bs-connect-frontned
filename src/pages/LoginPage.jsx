import React from 'react'
import LoginForm from '../components/auth/LoginForm';
import Brand from '../components/auth/Brand';

const LoginPage = () => {
  return (
    <main className="flex flex-col min-h-screen w-screen justify-center items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-[980px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Brand */}
            <div className="hidden lg:block">
                <Brand />
            </div>

            {/* Right side - Login Form */}
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
                        {/* Show brand on mobile */}
                        <div className="lg:hidden text-center mb-6">
                            <Brand size="small" />
                            <h1 className="text-blue-600 text-4xl font-bold mt-4">bs-connect</h1>
                        </div>

                        {/* Login Form */}
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default LoginPage