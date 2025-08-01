import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        if (data.message.includes('password')) {
          toast.error('Incorrect password');
        } else if (data.message.includes('User not found')) {
          toast.error('User not found. Please check your email or register.');
        } else {
          toast.error(data.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('User not found. Please check your email or register.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-purple-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Welcome Back
          </h2>
          <p className="mt-2 text-purple-600">Login to your account</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-purple-500" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-purple-500" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center"
          >
            <FaSignInAlt className="mr-2" />
            Login
          </button>
        </div>

        <div className="text-center">
          <p className="text-purple-600">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/register')} 
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;