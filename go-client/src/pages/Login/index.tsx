// src/pages/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { email, password });
      login(response.data.token);
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-[#352F44] p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
