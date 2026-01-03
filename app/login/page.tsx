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
        <main className="flex h-full bg-black overflow-hidden">
            {/* Left Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px]"></div>

                <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl relative z-20">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-extrabold mb-2 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Welcome Back
                        </h2>
                        <p className="text-gray-400">Please enter your details to sign in</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                            <p className="text-red-400 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-300 ml-1">Username or Email</label>
                            <input
                                type="text"
                                placeholder="name@example.com"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-300 ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300"
                                required
                            />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm mb-2">
                            <label className="flex items-center gap-2 text-gray-400 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-blue-600 outline-none transition-all" />
                                <span className="group-hover:text-gray-300 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">Forgot password?</a>
                        </div>

                        <button 
                            type="submit" 
                            className="p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300 transform active:scale-[0.98]"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-500 text-sm">
                        Don't have an account? <a href="/register" className="text-white hover:text-blue-400 transition-colors font-semibold">Sign up</a>
                    </p>
                </div>
            </div>

            {/* Right Side: Banner Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-black z-10"></div>
                <Image
                    src="/login_banner.png"
                    alt="Login Banner"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-x-0 bottom-0 p-16 z-20 bg-gradient-to-t from-black to-transparent">
                    <div className="max-w-md">
                        <div className="w-12 h-1 bg-blue-500 mb-6 rounded-full"></div>
                        <h3 className="text-5xl font-black text-white mb-6 leading-tight">Elevate Your Performance.</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">Experience a faster, more secure way to manage your enterprise operations with our next-generation dashboard.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
