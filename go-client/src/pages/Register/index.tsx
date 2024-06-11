    // src/pages/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
            { email, password }
        );
        console.log('User registered:', response.data);
        } catch (error) {
        console.error('Error registering user:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-4">Register</h2>
            <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
            />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Register
            </button>
        </form>
        </div>
    );
    };

    export default RegisterPage;
