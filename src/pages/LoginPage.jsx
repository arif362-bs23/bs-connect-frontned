import React from 'react'
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <main className="flex flex-col min-h-screen w-screen justify-center items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-[980px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Brand */}
            <div className="hidden lg:block">
                <div className="flex items-center gap-6">
                    <div>
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-2xl font-bold">BS</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-blue-600 text-6xl font-bold mb-4">bs-connect</h1>
                        <p className="text-2xl text-gray-600">Connect with your colleagues at BS-23</p>
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
                        {/* Show brand on mobile */}
                        <div className="lg:hidden text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <span className="text-white text-xl font-bold">BS</span>
                            </div>
                            <h1 className="text-blue-600 text-4xl font-bold">bs-connect</h1>
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