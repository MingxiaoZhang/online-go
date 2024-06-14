// src/pages/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        username,
        email,
        password,
      });
      console.log('User registered successfully:', response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-[#352F44] p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-white">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            required
          />
        </div>
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
          Register
        </button>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
