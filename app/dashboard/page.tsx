'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('register');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        dob: '',
        gender: '',
        contact: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, formData);
            setMessage('User registered successfully');
            setFormData({
                username: '', firstname: '', lastname: '', email: '', dob: '', gender: '', contact: '', password: ''
            });
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Registration failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <div className="flex h-screen bg-[#020617] text-gray-100 overflow-hidden font-sans">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 w-full bg-[#0a0f1e] p-4 shadow-2xl flex justify-between items-center z-40 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="font-black text-white text-xs">A</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Antigravity</h2>
                </div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed lg:relative top-0 left-0 h-full bg-[#0a0f1e] border-r border-white/5 z-50 transform transition-all duration-300 ease-in-out flex flex-col
                ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} 
                lg:translate-x-0 ${isCollapsed ? 'lg:w-[80px]' : 'lg:w-[260px]'}
            `}>
                {/* Sidebar Header */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
                    <div className={`flex items-center gap-3 transition-opacity duration-300 ${isCollapsed ? 'lg:opacity-0' : 'opacity-100'}`}>
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <span className="font-black text-white text-xl">A</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight whitespace-nowrap">Antigravity</h2>
                    </div>
                    
                    {/* PC Collapse Toggle */}
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-blue-600 rounded-full items-center justify-center text-white border border-[#020617] hover:bg-blue-500 transition-colors shadow-lg z-50"
                    >
                        <svg className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
                    <button
                        onClick={() => { setActiveTab('register'); setIsSidebarOpen(false); }}
                        className={`
                            w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                            ${activeTab === 'register' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                            ${isCollapsed ? 'justify-center px-2' : ''}
                        `}
                    >
                        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                        {!isCollapsed && <span className="font-medium whitespace-nowrap">Register User</span>}
                        {isCollapsed && (
                            <div className="absolute left-full ml-4 px-3 py-2 bg-blue-600 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[100] whitespace-nowrap shadow-xl">
                                Register User
                            </div>
                        )}
                    </button>
                    {/* Add more nav buttons here later */}
                </nav>

                {/* User Section / Logout */}
                <div className="p-4 border-t border-white/5 bg-[#0a0f1e]/80 backdrop-blur-md">
                    <button 
                        onClick={handleLogout} 
                        className={`
                            w-full flex items-center gap-3 p-3 text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-all group
                            ${isCollapsed ? 'justify-center px-2' : ''}
                        `}
                    >
                        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        {!isCollapsed && <span className="font-bold">Logout</span>}
                        {isCollapsed && (
                            <div className="absolute left-full ml-4 px-3 py-2 bg-red-600 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[100] whitespace-nowrap shadow-xl">
                                Logout
                            </div>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col relative h-full overflow-hidden">
                {/* Desktop Top Nav */}
                <header className="hidden lg:flex h-20 items-center justify-between px-8 border-b border-white/5 bg-[#020617]/50 backdrop-blur-md z-30">
                    <div className="text-gray-400 text-sm">
                        Pages / <span className="text-white font-medium capitalize">{activeTab}</span>
                    </div>
                </header>

                {/* Content Wrap */}
                <main className="flex-1 p-6 lg:p-10 overflow-y-auto w-full pt-24 lg:pt-10 scroll-smooth">
                    <div className="max-w-6xl mx-auto w-full">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                            <div>
                                <h1 className="text-4xl font-black text-white tracking-tight">Dashboard</h1>
                                <p className="text-gray-500 mt-1">Advanced enterprise backoffice management system.</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">System Status</div>
                                        <div className="text-sm font-bold text-white">All systems operational</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {activeTab === 'register' && (
                            <div className="bg-[#0a0f1e] p-8 lg:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                                {/* Decorative elements */}
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] group-hover:bg-blue-600/10 transition-all duration-500"></div>
                                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] group-hover:bg-indigo-600/10 transition-all duration-500"></div>

                                <div className="relative z-10">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                            Register New Account
                                        </h2>
                                        <p className="text-gray-500 mt-2">Create a secure user profile in the GST network.</p>
                                    </div>

                                    {message && (
                                        <div className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 ${
                                            message.includes('success') 
                                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                                : 'bg-red-500/10 border-red-500/20 text-red-400'
                                        }`}>
                                            <div className={`w-2 h-2 rounded-full ${message.includes('success') ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                            <p className="font-medium text-sm">{message}</p>
                                        </div>
                                    )}

                                    <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Core Identity</label>
                                                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600/50 outline-none transition-all duration-300" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Authentication</label>
                                                <input type="password" name="password" placeholder="Account Password" value={formData.password} onChange={handleChange} className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600/50 outline-none transition-all duration-300" required />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input type="text" name="firstname" placeholder="First" value={formData.firstname} onChange={handleChange} className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600/50 outline-none transition-all duration-300" />
                                                    <input type="text" name="lastname" placeholder="Last" value={formData.lastname} onChange={handleChange} className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600/50 outline-none transition-all duration-300" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Contact Details</label>
                                                <input type="email" name="email" placeholder="email@enterprise.com" value={formData.email} onChange={handleChange} className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600/50 outline-none transition-all duration-300" />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                                                <input type="tel" name="contact" placeholder="+1 (555) 000-0000" value={formData.contact} onChange={handleChange} className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600/50 outline-none transition-all duration-300" />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Demographics</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600/50 outline-none transition-all duration-300" />
                                                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl text-white focus:ring-2 focus:ring-blue-600/50 outline-none transition-all duration-300">
                                                        <option value="">Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-1 md:col-span-2 pt-4">
                                            <button type="submit" className="w-full p-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.2)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transform active:scale-[0.99]">
                                                Confirm & Create Entry
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
