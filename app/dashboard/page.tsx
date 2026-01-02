'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('register');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
            router.push('/login');
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
        router.push('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 relative">
            {/* Mobile Header */}
            <div className="md:hidden absolute top-0 left-0 w-full bg-white p-4 shadow flex justify-between items-center z-10">
                <h2 className="text-xl font-bold text-gray-800">Backoffice</h2>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 focus:outline-none">
                    {/* Hamburger Icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed md:relative top-0 left-0 h-full w-64 bg-white shadow-md z-20 transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 pt-16 md:pt-0
            `}>
                <div className="hidden md:block p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Backoffice</h2>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => { setActiveTab('register'); setIsSidebarOpen(false); }}
                                className={`w-full text-left p-2 rounded ${activeTab === 'register' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                Register User
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 border-t mt-auto absolute bottom-0 w-full bg-white">
                    <button onClick={handleLogout} className="w-full text-left p-2 text-red-600 hover:bg-red-50">
                        Logout
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-8 pt-20 md:pt-8 overflow-y-auto w-full">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
                
                {activeTab === 'register' && (
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New User</h2>
                        {message && <p className={`mb-4 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="p-2 border rounded text-black w-full" required />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="p-2 border rounded text-black w-full" required />
                            
                            <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} className="p-2 border rounded text-black w-full" />
                            <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} className="p-2 border rounded text-black w-full" />
                            
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded text-black w-full" />
                            <input type="tel" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="p-2 border rounded text-black w-full" />
                            
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="p-2 border rounded text-black w-full" />
                            <select name="gender" value={formData.gender} onChange={handleChange} className="p-2 border rounded text-black w-full">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            <div className="col-span-1 md:col-span-2">
                                <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
