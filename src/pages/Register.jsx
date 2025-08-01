import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        if (data.message.includes('already exists')) {
          toast.error('Email already registered. Please login or use another email.');
        } else {
          toast.error(data.message || 'Registration failed');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-purple-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Create Account
          </h2>
          <p className="mt-2 text-purple-600">Join our platform today</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-purple-500" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center"
          >
            <FaUserPlus className="mr-2" />
            Register
          </button>
        </div>

        <div className="text-center">
          <p className="text-purple-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')} 
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;