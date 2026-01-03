'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, {
                identifier,
                password
            });
            localStorage.setItem('token', res.data.token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <main className="flex min-h-screen">
            {/* Left Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-sky-200/50 backdrop-blur-sm">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>
                    {error && <p className="text-red-500 mb-4 bg-red-50 p-2 rounded text-center border border-red-200">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Username or Email</label>
                            <input
                                type="text"
                                placeholder="Enter your username or email"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="p-3 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-3 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Side: Banner Image */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <div className="absolute inset-0 bg-blue-600/10 z-10"></div>
                <Image
                    src="/login_banner.png"
                    alt="Login Banner"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-x-0 bottom-0 p-12 z-20 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-4xl font-bold text-white mb-4">Welcome Back</h3>
                    <p className="text-white/80 text-lg">Manage your business operations with our powerful backoffice dashboard.</p>
                </div>
            </div>
        </main>
    );
}
