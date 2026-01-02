'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                email,
                password
            });
            localStorage.setItem('token', res.data.token);
            alert('Login successful');
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">Login</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                />
                <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
            <p className="mt-4">
                Don't have an account? <a href="/register" className="text-blue-700 underline">Register</a>
            </p>
        </div>
    );
}
